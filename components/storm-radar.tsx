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
const BLIPS: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  label: string;
  labelFill: string;
  textX: number;
  textY: number;
  anchor: "start" | "middle" | "end";
  leader?: [number, number, number, number];
}[] = [
  {
    cx: 124,
    cy: 74,
    r: 3.5,
    fill: "#3aff8c",
    label: "T37 — POLITE",
    labelFill: "#3aff8c",
    textX: 98,
    textY: 58,
    anchor: "end",
    leader: [121, 69, 100, 61],
  },
  {
    cx: 150,
    cy: 66,
    r: 4.5,
    fill: "#ffb800",
    label: "T18 — WORRIED",
    labelFill: "#ffb800",
    textX: 150,
    textY: 124,
    anchor: "end",
    leader: [150, 72, 150, 112],
  },
  {
    cx: 158,
    cy: 136,
    r: 5.5,
    fill: "#ff2030",
    label: "T04 — FILING",
    labelFill: "#ff9a9a",
    textX: 160,
    textY: 150,
    anchor: "end",
  },
];

const LEGEND = [
  { fill: "#3aff8c", label: "harmless" },
  { fill: "#ffb800", label: "concerned" },
  { fill: "#ff2030", label: "filing for divorce" },
];

export function StormRadar() {
  return (
    <section className="panel flex h-full flex-col bg-night p-5 sm:p-6 @container">
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <p className="eyebrow text-neon-green">BUREAU OF APPROXIMATE SKIES · RADAR №7</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-white">Storm Radar</h2>
        </div>
        <span className="sticker -rotate-2 bg-neon-green text-ink">Parody · Not for navigation</span>
      </header>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[320px] overflow-hidden">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="A very serious radar of questionable accuracy"
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
          <ellipse cx="140" cy="80" rx="30" ry="26" fill="rgba(58,255,140,0.05)" stroke="#3aff8c" strokeWidth="1" strokeDasharray="3 3" opacity="0.9" />
          <text x="100" y="88" textAnchor="end" fontSize="10" fill="#3aff8c" opacity="0.85" className="font-mono">
            ALLEGED STORM
          </text>

          {/* blips */}
          {BLIPS.map((b) => (
            <g key={b.label}>
              {b.leader && (
                <line
                  x1={b.leader[0]}
                  y1={b.leader[1]}
                  x2={b.leader[2]}
                  y2={b.leader[3]}
                  stroke={b.fill}
                  strokeWidth="0.75"
                  opacity="0.5"
                />
              )}
              <circle cx={b.cx} cy={b.cy} r={b.r * 2.4} fill={b.fill} opacity="0.12" />
              <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} />
              <text x={b.textX} y={b.textY} textAnchor={b.anchor} fontSize="10" fill={b.labelFill} className="font-mono">
                {b.label}
              </text>
            </g>
          ))}

          {/* homebase */}
          <rect x="97.5" y="97.5" width="5" height="5" fill="#d9ffe8" />
          <text x="84" y="114" textAnchor="middle" fontSize="10" fill="#d9ffe8" className="font-mono">
            YOU
          </text>
        </svg>

        {/* rotating scan cone */}
        <div className="chaotic-sweep pointer-events-none absolute inset-[4%]" style={{ animationDelay: "-1.3s" }} />
      </div>

      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#1f5a34] pt-4 font-mono text-xs text-[#d9ffe8]">
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

      <footer className="mt-auto pt-4">
        <div className="border-t border-[#1f5a34]" />
        <p className="chaotic-pulse mt-3 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#3aff8c]">
          ● Calibrating…
        </p>
        <p className="mt-1 text-center font-mono text-xs text-[#7dffb0]/70">
          est. storm Ø: impossible to measure — give or take a neighborhood · sensor count: 1 (the good one)
        </p>
      </footer>
    </section>
  );
}
