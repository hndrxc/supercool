#!/usr/bin/env node
/**
 * build-us-postal.mjs — regenerate the compact static GeoNames US postal snapshot.
 *
 * Source: https://download.geonames.org/export/zip/US.zip (US.txt, tab-delimited)
 * License: CC BY 4.0 (attribution: geonames.org). Parent owns README attribution.
 *
 * US.txt columns (see readme.txt):
 *   0 country code | 1 postal code | 2 place name | 3 admin name1 | 4 admin code1
 *   | 5 admin name2 | 6 admin code2 | 7 admin name3 | 8 admin code3
 *   | 9 latitude | 10 longitude | 11 accuracy
 *
 * Output: data/us-postal.json (server-side).
 *
 * Usage:
 *   node scripts/build-us-postal.mjs            # download US.zip
 *   node scripts/build-us-postal.mjs /path/US.txt
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SOURCE_URL = "https://download.geonames.org/export/zip/US.zip";
const OUT = new URL("../data/us-postal.json", import.meta.url);

// U.S. 50 states + DC (excludes PR/VI/GU/AS/MP/UM and military FPO/APO rows,
// which carry a blank admin code1).
const STATES = [
  "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI",
  "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN",
  "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA",
  "WI", "WV", "WY",
];
const STATE_SET = new Set(STATES);

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

async function downloadPostalFile() {
  const response = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`GeoNames download failed: HTTP ${response.status}`);
  const directory = mkdtempSync(join(tmpdir(), "weather-postal-"));
  try {
    const archive = join(directory, "US.zip");
    writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
    return execFileSync("unzip", ["-p", archive, "US.txt"], { maxBuffer: 8 * 1024 * 1024 });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
function parseRows(text) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line) continue;
    const f = line.split("\t");
    if (f.length < 12) continue;
    if (f[0] !== "US") continue;
    if (!STATE_SET.has(f[4])) continue;
    const lat = Number(f[9]);
    const lon = Number(f[10]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    if (lat === 0 || lon === 0) continue;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) continue;
    const zip = f[1].trim();
    if (!/^\d{5}$/.test(zip)) continue;
    const name = f[2].trim();
    if (!name) continue;
    rows.push({ zip, name, state: f[4], lat, lon });
  }
  return rows;
}

function build(rows) {
  // Deterministic order: sort by ZIP (string; zero-padded 5-digit).
  rows.sort((a, b) => (a.zip < b.zip ? -1 : a.zip > b.zip ? 1 : 0));
  const states = [...STATES].sort();
  const stateIdx = new Map(states.map((s, i) => [s, i]));
  const names = [];
  const nameIdx = new Map();
  const zips = [];
  const townMap = new Map(); // `${nameIdx}|${stateIdx}` -> [nameIdx, stateIdx, count, zipIdx, latE5, lonE5]

  const seenZip = new Set();
  for (const r of rows) {
    if (seenZip.has(r.zip)) continue;
    seenZip.add(r.zip);
    let ni = nameIdx.get(r.name);
    if (ni === undefined) {
      ni = names.length;
      names.push(r.name);
      nameIdx.set(r.name, ni);
    }
    const si = stateIdx.get(r.state);
    const latE5 = Math.round(r.lat * 1e5);
    const lonE5 = Math.round(r.lon * 1e5);
    const zipIdx = zips.length;
    zips.push([r.zip, ni, si, latE5, lonE5]);
    const key = `${ni}|${si}`;
    const t = townMap.get(key);
    if (t) {
      t[2] += 1;
    } else {
      townMap.set(key, [ni, si, 1, zipIdx, latE5, lonE5]);
    }
  }

  const towns = [...townMap.values()];
  towns.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[3] - b[3]);

  return {
    meta: {
      source: SOURCE_URL,
      license: "CC BY 4.0 (attribution: geonames.org)",
      downloaded: new Date().toISOString().slice(0, 10),
      rows_source: rows.length,
      rows_used: zips.length,
      unique_zips: zips.length,
      unique_towns: towns.length,
      sha256_us_txt: "",
    },
    states,
    names,
    zips,
    towns,
  };
}

const raw = process.argv[2] ? readFileSync(process.argv[2]) : await downloadPostalFile();
const rows = parseRows(raw.toString("utf8"));
const data = build(rows);
data.meta.sha256_us_txt = sha256(raw);

const json = JSON.stringify(data);
writeFileSync(OUT, json);
const gz = gzipSync(Buffer.from(json), { level: 9 });

console.log(JSON.stringify({
  output: OUT.pathname,
  bytes_raw: Buffer.byteLength(json),
  bytes_gzip: gz.length,
  meta: data.meta,
}, null, 2));
