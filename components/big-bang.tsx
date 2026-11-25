import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/* BigBang: one-shot full-screen explosion overlay for the landing-page */
/* transition. It plays once each time it is mounted (the parent keys   */
/* it per search, so it replays). Deterministic, hydration-safe markup: */
/* every shard is placed from a fixed golden-angle table built at       */
/* module load, never from Math.random/Date.                           */
/* ------------------------------------------------------------------ */

const EMOJI = ["⚡", "☁️", "🌪️", "❄️", "☀️", "🌈", "☂️", "💧"] as const;

const NEON = [
  "#ff2d95",
  "#ffd700",
  "#00e5ff",
  "#7cfc00",
  "#b967ff",
  "#ff6a00",
  "#00ffab",
  "#ff4d4d",
] as const;

/** Golden angle (radians): spreads shards evenly without clumping. */
const GOLDEN_ANGLE = 2.399963229728653;

const SHARD_COUNT = 36;

interface ShardSpec {
  x: string; // e.g. "83.1vw" — final horizontal offset
  y: string; // e.g. "-62.4vh" — final vertical offset
  spin: string; // final rotation, "238deg"
  delay: string;
  dur: string;
  size: string;
  color: string;
  emoji?: string;
}

function buildShards(): ShardSpec[] {
  const shards: ShardSpec[] = [];
  for (let i = 0; i < SHARD_COUNT; i += 1) {
    const angle = i * GOLDEN_ANGLE;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Reach is always > 105 viewport units, so every shard clears the
    // farthest screen edge regardless of its angle.
    const reach = 112 + ((i * 13) % 21); // 112–132
    const x = (cos * reach).toFixed(1);
    const y = (sin * reach).toFixed(1);

    const spin = ((i * 97) % 540) - 270; // -270deg..269deg
    const delay = 0.05 + (i % 12) * 0.035 + Math.floor(i / 12) * 0.055;
    const dur = 1.0 + ((i * 7) % 5) * 0.1; // 1.0–1.4s
    const size = 15 + ((i * 11) % 20); // 15–34px

    const emoji = i % 3 === 0 ? EMOJI[i / 3] : undefined;
    const color = NEON[(i * 5) % NEON.length];

    shards.push({
      x: `${x}vw`,
      y: `${y}vh`,
      spin: `${spin}deg`,
      delay: `${delay.toFixed(3)}s`,
      dur: `${dur.toFixed(2)}s`,
      size: `${size}px`,
      color,
      emoji,
    });
  }
  return shards;
}

const SHARDS = buildShards();

interface RingSpec {
  color: string;
  delay: string;
  dur: string;
}

const RINGS: RingSpec[] = [
  { color: "#ff2d95", delay: "0.02s", dur: "1.30s" },
  { color: "#ffd700", delay: "0.10s", dur: "1.45s" },
  { color: "#00e5ff", delay: "0.18s", dur: "1.55s" },
  { color: "#7cfc00", delay: "0.26s", dur: "1.60s" },
  { color: "#b967ff", delay: "0.34s", dur: "1.45s" },
];

export function BigBang() {
  return (
    <div className="big-bang" aria-hidden="true">
      <div className="big-bang__cover" />
      <div className="big-bang__core" />
      {RINGS.map((ring, i) => (
        <span
          key={`ring-${i}`}
          className="big-bang__ring"
          style={
            {
              "--bb-ring-color": ring.color,
              "--bb-ring-delay": ring.delay,
              "--bb-ring-dur": ring.dur,
            } as CSSProperties
          }
        />
      ))}
      {SHARDS.map((shard, i) => (
        <span
          key={`shard-${i}`}
          className={`big-bang__shard${shard.emoji ? " big-bang__shard--emoji" : ""}`}
          style={
            {
              "--bb-x": shard.x,
              "--bb-y": shard.y,
              "--bb-spin": shard.spin,
              "--bb-delay": shard.delay,
              "--bb-dur": shard.dur,
              "--bb-size": shard.size,
              "--bb-color": shard.color,
            } as CSSProperties
          }
        >
          {shard.emoji}
        </span>
      ))}
    </div>
  );
}
