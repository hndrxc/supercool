import type { CSSProperties } from "react";

const LEGEND: { n?: number; color: string; name: string; note: string }[] = [
  { n: 1, color: "#3aff8c", name: "Sunnyville", note: "sunshine is legal here" },
  { n: 2, color: "#9aa0a6", name: "Cloud City", note: "100% clouds, allegedly" },
  { n: 3, color: "#2dd4bf", name: "The Damp Quarter", note: "it is always damp. apologies." },
  { n: 4, color: "#ff9500", name: "Tornado Alley", note: "do not go" },
  { color: "#ff3131", name: "Your House", note: "the actual target" },
];

export function ForecastMap() {
  return (
    <section className="panel flex h-full flex-col bg-night p-5 sm:p-6 @container">
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <p className="eyebrow text-neon-cyan">DEPT. OF CERTAINLY · CHART №13</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-neon-yellow">Sundorp</h2>
          <p className="mt-1 font-mono text-xs text-[#b4a8ff]">(population: you, plus one suspect)</p>
        </div>
        <span className="sticker rotate-2 bg-neon-pink text-ink">Parody · Fictional</span>
      </header>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="sticker chaotic-pulse -rotate-2 bg-[#ff2030] text-white">🛰 Feed: Allegedly Live</span>
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="h-16 w-16 shrink-0 drop-shadow-[3px_3px_0_0_#171438]"
        >
          <g className="chaotic-spin" style={{ "--spin-s": "20s" } as CSSProperties}>
            <circle cx="50" cy="50" r="44" fill="#0f0c28" stroke="#ffd60a" strokeWidth="3" />
            <text x="50" y="20" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#ffd60a" className="font-mono">
              N
            </text>
            <path d="M 50 16 L 57 54 L 43 54 Z" fill="#ff3131" />
            <path d="M 50 84 L 57 46 L 43 46 Z" fill="#b4a8ff" />
            <circle cx="50" cy="50" r="5" fill="#ffd60a" stroke="#0f0c28" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <svg
        viewBox="0 0 400 320"
        role="img"
        aria-label="Official map of Sundorp, a fictional town"
        className="mx-auto mt-4 block w-full max-w-[460px]"
      >
        {/* sea */}
        <rect x="1" y="1" width="398" height="318" rx="20" fill="#0f0c28" stroke="#332c66" strokeWidth="2" />

        {/* faint survey grid */}
        <g stroke="#241f4d" strokeWidth="1" opacity="0.55">
          <line x1="100" y1="10" x2="100" y2="310" />
          <line x1="200" y1="10" x2="200" y2="310" />
          <line x1="300" y1="10" x2="300" y2="310" />
          <line x1="10" y1="105" x2="390" y2="105" />
          <line x1="10" y1="210" x2="390" y2="210" />
        </g>

        {/* sea squiggles */}
        <g fill="none" stroke="#24c6ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.3">
          <path d="M 16 60 q 7 -6 14 0 t 14 0" />
          <path d="M 22 292 q 7 -6 14 0 t 14 0" />
          <path d="M 338 44 q 7 -6 14 0 t 14 0" />
          <path d="M 344 302 q 7 -6 14 0 t 14 0" />
        </g>

        {/* official banner */}
        <text x="200" y="28" textAnchor="middle" fontSize="20" letterSpacing="2" fontWeight="bold" fill="#ffd60a" className="font-mono">
          ★ OFFICIAL MAP OF SUNDORP ★
        </text>

        {/* landmass */}
        <rect x="56" y="42" width="288" height="234" rx="50" fill="#2a2450" stroke="#4c4390" strokeWidth="3" />

        {/* river */}
        <path d="M 344 42 Q 316 108 322 158 T 288 276" fill="none" stroke="#24c6ff" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        <path d="M 344 42 Q 316 108 322 158 T 288 276" fill="none" stroke="#9beeff" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 10" />
        <text x="330" y="60" textAnchor="end" fontSize="20" fontWeight="bold" fill="#7fe3ff" className="font-mono">
          R. FUN
        </text>

        {/* Sunnyville */}
        <ellipse cx="126" cy="118" rx="50" ry="32" fill="#3aff8c" stroke="#1d9e52" strokeWidth="2" />
        <circle cx="126" cy="104" r="13" fill="#171438" stroke="#fff7e8" strokeWidth="2" />
        <text x="126" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff7e8" className="font-mono">
          1
        </text>

        {/* Cloud City */}
        <ellipse cx="282" cy="104" rx="46" ry="28" fill="#9aa0a6" stroke="#5f636c" strokeWidth="2" />
        <circle cx="282" cy="90" r="13" fill="#171438" stroke="#fff7e8" strokeWidth="2" />
        <text x="282" y="96" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff7e8" className="font-mono">
          2
        </text>

        {/* The Damp Quarter */}
        <ellipse cx="268" cy="222" rx="52" ry="30" fill="#2dd4bf" stroke="#159e92" strokeWidth="2" opacity="0.92" />
        <circle cx="268" cy="208" r="13" fill="#171438" stroke="#fff7e8" strokeWidth="2" />
        <text x="268" y="214" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff7e8" className="font-mono">
          3
        </text>

        {/* Tornado Alley */}
        <g transform="translate(120 252)">
          <path
            d="M 0 0 a 12 12 0 0 1 -24 0 a 8 8 0 0 1 16 0 a 5 5 0 0 1 -10 0 a 3 3 0 0 1 6 0"
            fill="none"
            stroke="#ff9500"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
        <circle cx="158" cy="236" r="13" fill="#171438" stroke="#fff7e8" strokeWidth="2" />
        <text x="158" y="242" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff7e8" className="font-mono">
          4
        </text>

        {/* Your House */}
        <circle cx="196" cy="180" r="6" fill="#ff3131" stroke="#fff7e8" strokeWidth="2" />
        <path d="M 203 173 L 246 161" stroke="#ff3131" strokeWidth="2" strokeDasharray="3 3" />
        <text x="315" y="152" textAnchor="end" fontSize="20" fontWeight="bold" fill="#ff8092" className="font-mono">
          ⌖ YOU ARE HERE
        </text>

        {/* scale bar */}
        <rect x="182" y="301" width="18" height="5" fill="#b4a8ff" />
        <rect x="200" y="301" width="18" height="5" fill="#241f4d" stroke="#b4a8ff" strokeWidth="1" />
        <rect x="218" y="301" width="18" height="5" fill="#b4a8ff" />
        <text x="200" y="296" textAnchor="middle" fontSize="20" fill="#b4a8ff" className="font-mono">
          1 BOX = 1 MOOD
        </text>
      </svg>

      <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 @sm:grid-cols-2">
        {LEGEND.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            {item.n !== undefined ? (
              <>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/40 bg-ink font-mono text-xs font-bold text-white">
                  {item.n}
                </span>
                <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/30" style={{ backgroundColor: item.color }} />
              </>
            ) : (
              <span className="h-4 w-4 shrink-0 rounded-full border-2 border-white/50" style={{ backgroundColor: item.color }} />
            )}
            <p className="min-w-0 text-xs leading-snug text-[#cfc6ff]">
              <span className="font-bold text-white">{item.name}</span> — {item.note}
            </p>
          </div>
        ))}
      </div>

      <footer className="mt-auto pt-4">
        <div className="border-t border-[#332c66]" />
        <p className="mt-3 text-center font-mono text-xs italic text-[#8f86c9]">
          *map accurate to 92% confidence — the 8% is clouds. The satellite is a very serious bird.
        </p>
      </footer>
    </section>
  );
}
