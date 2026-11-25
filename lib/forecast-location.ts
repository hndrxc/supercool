// Server-side inputs: GeoNames postal points and Open-Meteo's U.S. geocoder.
// The bundled national postal snapshot never needs to reach the browser.
import postal from "../data/us-postal.json";

export type ForecastLocation = {
  label: string;
  latitude: number;
  longitude: number;
};

export type DisplacedLocation = {
  requested: ForecastLocation;
  actual: ForecastLocation;
  distanceMiles: number;
};

type ZipRow = readonly [zip: string, nameIdx: number, stateIdx: number, latE5: number, lonE5: number];
type TownRow = readonly [nameIdx: number, stateIdx: number, zipCount: number, zipIdx: number, latE5: number, lonE5: number];

const { states, names, zips, towns } = postal as unknown as {
  states: string[];
  names: string[];
  zips: ZipRow[];
  towns: TownRow[];
};

const EARTH_RADIUS_MILES = 3958.8;
const MIN_DISTANCE_MILES = 1;
const BAND_MIN_MILES = 25;
const BAND_MAX_MILES = 60;
const TARGET_MILES = 35;

const zipIndex = new Map(zips.map((row) => [row[0], row]));
const townId = (name: number, state: number) => name * states.length + state;
const townSizes = new Map(towns.map(([name, state, count]) => [townId(name, state), count]));

const FULL_STATE_TO_CODE: Readonly<Record<string, string>> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC",
  Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI",
  Minnesota: "MN", Mississippi: "MS", Missouri: "MO", Montana: "MT",
  Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC",
  "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR",
  Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT",
  Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV",
  Wisconsin: "WI", Wyoming: "WY",
};

const stateCodes = new Map(Object.entries(FULL_STATE_TO_CODE).flatMap(([name, code]) => [
  [name.toLowerCase(), code],
  [code.toLowerCase(), code],
] as const));

function stateCode(value?: string): string | undefined {
  return stateCodes.get(value?.trim().toLowerCase().replaceAll(".", "") ?? "");
}

function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const radians = Math.PI / 180;
  const a = Math.sin((lat2 - lat1) * radians / 2) ** 2 +
    Math.cos(lat1 * radians) * Math.cos(lat2 * radians) * Math.sin((lon2 - lon1) * radians / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(Math.min(1, a)));
}

function postalLocation(row: ZipRow, showZip: boolean): ForecastLocation {
  const [zip, name, state, latitude, longitude] = row;
  return {
    label: `${showZip ? `${zip} · ` : ""}${names[name]}, ${states[state]}`,
    latitude: latitude / 1e5,
    longitude: longitude / 1e5,
  };
}

const TOWN_ALIASES: Readonly<Record<string, string>> = {
  st: "saint", ft: "fort", mt: "mount", ste: "sainte", jct: "junction",
};

function normalizeTownName(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/^(?:city of )|(?: city)$/g, "")
    .replace(/\b(?:st|ft|mt|ste|jct)\b/g, (alias) => TOWN_ALIASES[alias]);
}

const normalizedNames = names.map(normalizeTownName);
const townsByName = new Map<string, TownRow[]>();
for (const town of towns) {
  const name = normalizedNames[town[0]];
  const matches = townsByName.get(name);
  if (matches) matches.push(town);
  else townsByName.set(name, [town]);
}

function localTown(name: string, state?: string): ZipRow | undefined {
  let best: TownRow | undefined;
  for (const town of townsByName.get(normalizeTownName(name)) ?? []) {
    if (state && states[town[1]] !== state) continue;
    if (!best || town[2] > best[2]) best = town;
  }
  return best ? zips[best[3]] : undefined;
}

function splitTown(query: string): [name: string, state?: string] {
  const comma = query.indexOf(",");
  if (comma !== -1) {
    return [query.slice(0, comma).trim(), stateCode(query.slice(comma + 1))];
  }
  const suffix = query.match(/^(.+?)\s+([a-z.]{2,4})$/i);
  const state = suffix && stateCode(suffix[2]);
  return suffix && state ? [suffix[1], state] : [query];
}

async function geocodeUS(query: string): Promise<{ location: ForecastLocation; name: string; state?: string } | null> {
  const params = new URLSearchParams({ name: query, count: "10", language: "en", countryCode: "US" });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Open-Meteo geocoder: HTTP ${response.status}`);
  const body: { results?: Array<{ name?: string; latitude?: number; longitude?: number; admin1?: string; country_code?: string }> } = await response.json();
  for (const row of body.results ?? []) {
    if (row.country_code !== "US" || !row.name ||
      typeof row.latitude !== "number" || !Number.isFinite(row.latitude) || Math.abs(row.latitude) > 90 ||
      typeof row.longitude !== "number" || !Number.isFinite(row.longitude) || Math.abs(row.longitude) > 180) continue;
    const state = stateCode(row.admin1);
    return {
      name: normalizeTownName(row.name),
      state,
      location: { label: state ? `${row.name}, ${state}` : row.name, latitude: row.latitude, longitude: row.longitude },
    };
  }
  return null;
}

function displace(
  requested: ForecastLocation,
  origin: { zip: string } | { name: string; state?: string },
): DisplacedLocation | null {
  const zip = "zip" in origin ? origin.zip : undefined;
  const name = "name" in origin ? origin.name : undefined;
  const state = "state" in origin ? origin.state : undefined;
  let best: ZipRow | undefined;
  let bestScore = Infinity;
  let bestDistance = Infinity;
  let nearest: ZipRow | undefined;
  let nearestDistance = Infinity;

  for (const row of zips) {
    if (row[0] === zip || (normalizedNames[row[1]] === name && (!state || states[row[2]] === state))) continue;
    const distance = haversineMiles(requested.latitude, requested.longitude, row[3] / 1e5, row[4] / 1e5);
    if (distance < MIN_DISTANCE_MILES) continue;
    if (distance < nearestDistance) {
      nearest = row;
      nearestDistance = distance;
    }
    if (distance < (zip ? 10 : BAND_MIN_MILES) || distance > BAND_MAX_MILES) continue;
    const score = zip
      ? Math.abs(distance - 25)
      : -100 * (townSizes.get(townId(row[1], row[2])) ?? 1) + Math.abs(distance - TARGET_MILES);
    if (score < bestScore) {
      best = row;
      bestScore = score;
      bestDistance = distance;
    }
  }

  const actual = best ?? nearest;
  return actual ? {
    requested,
    actual: postalLocation(actual, zip !== undefined),
    distanceMiles: best ? bestDistance : nearestDistance,
  } : null;
}

/** Resolve a U.S. ZIP or place, then deliberately use a different weather point. */
export async function resolveDisplacedLocation(query: string): Promise<DisplacedLocation | null> {
  const input = query.trim();
  if (!input) return null;
  if (/^[\d -]+$/.test(input)) {
    if (!/^\d{5}(?:-?\d{4})?$/.test(input)) return null;
    const zip = input.slice(0, 5);
    const row = zipIndex.get(zip);
    return row ? displace(postalLocation(row, true), { zip }) : null;
  }

  const [name, state] = splitTown(input);
  if (!name) return null;
  const row = input.includes(",") && !state ? undefined : localTown(name, state);
  if (row) {
    return displace(postalLocation(row, false), { name: normalizedNames[row[1]], state: states[row[2]] });
  }

  const geocoded = await geocodeUS(state ? `${name}, ${state}` : input);
  return geocoded ? displace(geocoded.location, geocoded) : null;
}
