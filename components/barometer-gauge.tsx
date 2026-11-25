const MIN_HPA = 970;
const MAX_HPA = 1050;

const MOODS = [
  { min: 1040, label: "TEXTBOOK ANTICYCLONE", note: "the sky is smug and will not elaborate" },
  { min: 1023, label: "CALM, PROFESSIONALLY", note: "conditions are holding a steady line" },
  { min: 1013, label: "BORINGLY NORMAL", note: "the weather filed its taxes on time" },
  { min: 998, label: "APPROACHING DRAMA", note: "a front is rehearsing offstage" },
  { min: 970, label: "WEATHER HAS FEELINGS", note: "umbrella recommended, just in case" },
] as const;

function barometerMood(pressureHpa: number) {
  return MOODS.find((mood) => pressureHpa >= mood.min) ?? MOODS[MOODS.length - 1];
}

const CX = 100;
const CY = 114;
const ARC_R = 84;

function arcPoint(fraction: number) {
  const theta = Math.PI * (1 - fraction);
  return {
    x: CX + ARC_R * Math.cos(theta),
    y: CY - ARC_R * Math.sin(theta),
  };
}

const TICK_PRESSURES = [980, 990, 1000, 1010, 1020, 1030, 1040];

export function BarometerGauge({ pressureHpa }: { pressureHpa: number }) {
  const clamped = Math.min(MAX_HPA, Math.max(MIN_HPA, pressureHpa));
  const deg = 10 + ((clamped - MIN_HPA) / (MAX_HPA - MIN_HPA)) * 160;
  const mood = barometerMood(pressureHpa);

  return (
    <section className="panel relative flex h-full flex-col bg-night p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="eyebrow text-white/60">Bureau of Approximate Skies</p>
          <h2 className="font-lobster text-3xl leading-tight text-white">The Mood-o-Meter</h2>
        </div>
        <span className="sticker -rotate-3 bg-neon-yellow text-ink">PSI-SAFE™ ✨</span>
      </div>

      <svg viewBox="0 0 200 134" className="mt-5 w-full" role="img" aria-label="Barometer mood gauge">
        <path d="M 16 114 A 84 84 0 0 1 184 114" fill="none" stroke="#2a1558" strokeWidth="14" strokeLinecap="round" />
        <path d="M 16 114 A 84 84 0 0 1 58 41.25" fill="none" stroke="#46e66b" strokeWidth="9" />
        <path d="M 58 41.25 A 84 84 0 0 1 142 41.25" fill="none" stroke="#ffd23e" strokeWidth="9" />
        <path d="M 142 41.25 A 84 84 0 0 1 184 114" fill="none" stroke="#ff3b3b" strokeWidth="9" />
        {TICK_PRESSURES.map((p) => {
          const fraction = (p - MIN_HPA) / (MAX_HPA - MIN_HPA);
          const outer = arcPoint(fraction);
          const dx = (outer.x - CX) / ARC_R;
          const dy = (outer.y - CY) / ARC_R;
          return (
            <line
              key={p}
              x1={CX + dx * 68}
              y1={CY + dy * 68}
              x2={CX + dx * 77}
              y2={CY + dy * 77}
              stroke="#fffdf2"
              strokeOpacity={0.4}
              strokeWidth="1.5"
            />
          );
        })}
        <text x="16" y="132" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          {MIN_HPA}
        </text>
        <text x="100" y="20" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          1010
        </text>
        <text x="184" y="132" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          {MAX_HPA}
        </text>
        <g
          style={{
            transform: `rotate(${deg}deg)`,
            transformOrigin: "100px 114px",
            transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <line x1="100" y1="114" x2="44" y2="114" stroke="#171438" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="114" r="4" fill="#fffdf2" />
        </g>
        <circle cx="100" cy="114" r="7" fill="#171438" stroke="#fffdf2" strokeWidth="2" />
      </svg>

      <p className="mt-4 text-center font-mono text-[min(3.75rem,16cqw)] font-black tabular-nums text-white">
        {pressureHpa.toFixed(1) + " hPa"}
      </p>
      <p className="mt-2 text-center font-lobster text-3xl leading-tight text-neon-cyan">{mood.label}</p>
      <p className="mt-1 text-center font-mono text-xs italic text-white/70">“{mood.note}”</p>

      <p className="mt-auto border-t border-white/15 pt-3 text-center font-mono text-xs uppercase tracking-widest text-white/50">
        calibrated nightly by a skeptical meteorologist
      </p>
    </section>
  );
}