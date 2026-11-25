import { current } from "@/lib/weather";

// 12 range ticks on the outer ring, pre-computed once (forever)
const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI * 2) / 12;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    x1: 100 + cos * 74,
    y1: 100 + sin * 74,
    x2: 100 + cos * 80,
    y2: 100 + sin * 80,
  };
});

// static blips huddled around the storm area — red / amber / green, sizes vary
const BLIPS = [
  { cx: 122, cy: 67, r: 2.5, fill: "#3aff8c" },
  { cx: 137, cy: 84, r: 4, fill: "#ffb800" },
  { cx: 126, cy: 100, r: 5.5, fill: "#ff2030" },
];

const LEGEND = [
  { fill: "#3aff8c", label: "harmless" },
  { fill: "#ffb800", label: "concerned" },
  { fill: "#ff2030", label: "filing for divorce" },
];

export function StormRadar() {
  return (
    <section className="rotate-1 border-4 border-[#0f2e1d] bg-[#0a1a10] p-5 shadow-[10px_10px_0_0_#171438]">
      {/* header */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-dotted border-[#1f5a34] pb-2">
        <h2 className="font-mono text-sm font-bold tracking-[0.25em] text-[#3aff8c] drop-shadow-[2px_2px_0_#0f2e1d] sm:text-base">
          STORM RADAR v2.3.1 (beta, maybe)
        </h2>
        <p className="font-mono text-[10px] text-[#2c8a4e]">
          sensor count: 1 (the good one)
        </p>
      </header>

      {/* the scope */}
      <div className="relative mx-auto mt-5 aspect-square w-full max-w-[380px] overflow-hidden">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="a very serious radar of questionable accuracy"
        >
          <defs>
            <radialGradient id="storm-radar-scope" cx="50%" cy="50%" r="72%">
              <stop offset="0%" stopColor="#0d3a20" />
              <stop offset="65%" stopColor="#072414" />
              <stop offset="100%" stopColor="#030f08" />
            </radialGradient>
          </defs>

          {/* face */}
          <rect x="2" y="2" width="196" height="196" rx="16" fill="#04120a" stroke="#1f5a34" strokeWidth="2" />
          <rect x="8" y="8" width="184" height="184" rx="12" fill="url(#storm-radar-scope)" />

          {/* range rings */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#1f5a34" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#1f5a34" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#1f5a34" strokeWidth="1" strokeDasharray="2 5" opacity="0.6" />

          {/* cross hairlines */}
          <line x1="100" y1="18" x2="100" y2="182" stroke="#1f5a34" strokeWidth="1" opacity="0.7" />
          <line x1="18" y1="100" x2="182" y2="100" stroke="#1f5a34" strokeWidth="1" opacity="0.7" />

          {/* range ticks */}
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#2c8a4e" strokeWidth="1.5" />
          ))}

          {/* the storm area (allegedly) */}
          <ellipse cx="128" cy="84" rx="27" ry="25" fill="rgba(58,255,140,0.05)" stroke="#3aff8c" strokeWidth="1" strokeDasharray="3 3" opacity="0.9" />
          <text x="128" y="113" textAnchor="middle" fontSize="6.5" fill="#2c8a4e" className="font-mono">
            STORM (allegedly)
          </text>

          {/* blips */}
          {BLIPS.map((b) => (
            <g key={`${b.cx}-${b.cy}`}>
              <circle cx={b.cx} cy={b.cy} r={b.r * 2.4} fill={b.fill} opacity="0.12" />
              <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} />
            </g>
          ))}

          {/* T37, the polite one (it is the green blip, obviously) */}
          <line
            x1={BLIPS[0].cx - 4}
            y1={BLIPS[0].cy - 6}
            x2={116}
            y2={57}
            stroke="#3aff8c"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <text x={115} y={55} textAnchor="end" fontSize="6.5" fill="#3aff8c" className="font-mono">
            T37 (the polite one)
          </text>

          {/* homebase */}
          <rect x="97.5" y="97.5" width="5" height="5" fill="#d9ffe8" />
          <text x="105" y="95" fontSize="6" fill="#2c8a4e" className="font-mono">
            YOU
          </text>
        </svg>

        {/* rotating scan cone */}
        <div
          className="chaotic-sweep pointer-events-none absolute inset-[4%]"
          style={{ animationDelay: "-1.3s" }}
        />
      </div>

      {/* status legend */}
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t-2 border-dotted border-[#1f5a34] pt-3 font-mono text-[11px] text-[#d9ffe8]">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill, boxShadow: `0 0 8px ${item.fill}` }}
              aria-hidden="true"
            />
            {item.label}
          </li>
        ))}
      </ul>

      {/* calibration, forever and ever */}
      <p className="chaotic-pulse mt-4 text-center font-mono text-[10px] font-bold tracking-[0.35em] text-[#3aff8c]">
        ● CALIBRATING…
      </p>
      <p className="mt-1 text-center font-mono text-[10px] text-[#2c8a4e]">
        est. storm Ø {current.stormDiameterM}m (give or take a neighborhood)
      </p>
    </section>
  );
}