import type { CSSProperties } from "react";
import { current } from "@/lib/weather";

const LEGEND: { color: string; label: string }[] = [
  { color: "#3aff8c", label: "Sunnyville (sunshine: legal)" },
  { color: "#9aa0a6", label: "Cloud City (100% clouds, allegedly)" },
  { color: "#2dd4bf", label: "The Damp Quarter (it's always damp)" },
  { color: "#ff3131", label: "Your House (the actual target)" },
];

export function ForecastMap() {
  return (
    <section className="-rotate-1">
      {/* ---- card ---- */}
      <div className="rounded-2xl border-4 border-dashed border-[#b455ff] bg-[#191436] p-5 shadow-[10px_10px_0_0_#171438]">
        <header className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-dotted border-[#4c4390] pb-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#24c6ff]">
              DEPT. OF CERTAINLY · CHART №13
            </p>
            <h2 className="font-lobster text-4xl leading-none text-[#ffd60a]">Sundorp</h2>
            <p className="font-mono text-xs text-[#b4a8ff]">(population: you, plus one suspect)</p>
          </div>
          <p className="rotate-2 rounded border-2 border-[#ff2079] bg-[#ff2079]/10 px-2 py-1 font-mono text-[10px] text-[#ff9ecb]">
            TODAY: {current.condition.toUpperCase()} ✔ CONFIRMED*
          </p>
        </header>

        {/* ---- stickers + compass ---- */}
        <div className="mt-3 flex flex-wrap items-start justify-between gap-x-2 gap-y-2">
          <div className="flex flex-col items-start gap-0.5">
            <span className="chaotic-pulse -rotate-6 rounded-md border-2 border-dashed border-[#ff8080] bg-[#ff2030] px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-white shadow-[4px_4px_0_0_#171438]">
              🛰 LIVE SATELLITE*
            </span>
            <span className="-rotate-6 font-mono text-[9px] text-[#ff9ecb]">*it is a very serious bird</span>
          </div>
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="h-24 w-24 shrink-0 drop-shadow-[4px_4px_0_0_#171438]"
          >
            <g className="chaotic-spin" style={{ "--spin-s": "20s" } as CSSProperties}>
              <circle cx="50" cy="50" r="46" fill="#191436" stroke="#ffd60a" strokeWidth="3" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#4c4390" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="50" y="12" textAnchor="middle" className="font-mono" fontSize="10" fill="#ffd60a">N</text>
              <text x="93" y="54" textAnchor="middle" className="font-mono" fontSize="10" fill="#b4a8ff">E</text>
              <text x="50" y="96" textAnchor="middle" className="font-mono" fontSize="10" fill="#b4a8ff">S</text>
              <text x="8" y="54" textAnchor="middle" className="font-mono" fontSize="10" fill="#b4a8ff">W</text>
              <path d="M 50 16 L 57 50 L 43 50 Z" fill="#ff3131" />
              <path d="M 50 84 L 57 50 L 43 50 Z" fill="#b4a8ff" />
              <circle cx="50" cy="50" r="5" fill="#ffd60a" stroke="#191436" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* ---- the map ---- */}
        <svg
          viewBox="0 0 400 300"
          role="img"
          aria-label="Highly unscientific official map of Sundorp"
          className="mx-auto mt-3 block w-full max-w-[480px]"
        >
          {/* sea */}
          <rect x="1" y="1" width="398" height="298" rx="18" fill="#14112b" stroke="#332c66" strokeWidth="2" />

          {/* faint grid */}
          <g stroke="#241f4d" strokeWidth="1">
            <line x1="100" y1="8" x2="100" y2="292" />
            <line x1="200" y1="8" x2="200" y2="292" />
            <line x1="300" y1="8" x2="300" y2="292" />
            <line x1="8" y1="100" x2="392" y2="100" />
            <line x1="8" y1="200" x2="392" y2="200" />
          </g>

          {/* sea squiggles (the "ocean") */}
          <g fill="none" stroke="#24c6ff" strokeWidth="2" strokeLinecap="round" opacity="0.35">
            <path d="M 12 82 q 6 -5 12 0 t 12 0" />
            <path d="M 14 206 q 6 -5 12 0 t 12 0" />
            <path d="M 350 122 q 6 -5 12 0 t 12 0" />
            <path d="M 354 222 q 6 -5 12 0 t 12 0" />
          </g>
          <text x="200" y="288" textAnchor="middle" className="font-mono" fontSize="9" fill="#3d3775">
            THE OCEAN (UNCONFIRMED) · GPS: 99.9% LOST
          </text>

          {/* official banner */}
          <text x="200" y="22" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="3" fill="#ffd60a">
            ★ OFFICIAL MAP OF SUNDORP ★
          </text>

          {/* landmass */}
          <rect x="62" y="48" width="276" height="206" rx="46" fill="#2a2450" stroke="#4c4390" strokeWidth="3" strokeDasharray="12 7" />

          {/* the river */}
          <path
            d="M 318 48 C 300 86 332 116 306 150 S 262 214 272 254"
            fill="none"
            stroke="#24c6ff"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 318 48 C 300 86 332 116 306 150 S 262 214 272 254"
            fill="none"
            stroke="#9beeff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 10"
          />
          <text transform="translate(322 152) rotate(-74)" className="font-mono" fontSize="9" fill="#7fe3ff">
            R. Fun
          </text>

          {/* Sunnyville */}
          <ellipse cx="140" cy="112" rx="42" ry="29" fill="#3aff8c" stroke="#1d9e52" strokeWidth="2" />
          <text x="114" y="96" fontSize="12">☀️</text>
          <text x="140" y="116" textAnchor="middle" className="font-mono" fontSize="11" fill="#0b3d20" fontWeight="bold">
            Sunnyville
          </text>

          {/* Cloud City */}
          <ellipse cx="252" cy="92" rx="38" ry="24" fill="#9aa0a6" stroke="#5f636c" strokeWidth="2" />
          <text x="226" y="74" fontSize="11">☁️</text>
          <text x="252" y="96" textAnchor="middle" className="font-mono" fontSize="11" fill="#23262b" fontWeight="bold">
            Cloud City
          </text>

          {/* The Damp Quarter */}
          <ellipse cx="230" cy="202" rx="40" ry="26" fill="#2dd4bf" stroke="#159e92" strokeWidth="2" opacity="0.92" />
          <text x="204" y="186" fontSize="11">💧</text>
          <text x="230" y="206" textAnchor="middle" className="font-mono" fontSize="11" fill="#062f2a" fontWeight="bold">
            The Damp Quarter
          </text>

          {/* Tornado Alley */}
          <g transform="translate(118 206)">
            <path
              d="M 0 0 a 12 12 0 0 1 -24 0 a 8 8 0 0 1 16 0 a 5 5 0 0 1 -10 0 a 3 3 0 0 1 6 0"
              fill="none"
              stroke="#ff9500"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <text x="118" y="236" textAnchor="middle" className="font-mono" fontSize="9" fill="#ffb36b">
            Tornado Alley
          </text>
          <text x="118" y="247" textAnchor="middle" className="font-mono" fontSize="8.5" fill="#ff9ecb">
            (do not go)
          </text>

          {/* Your House — slightly off-center, as all maps should be */}
          <circle cx="196" cy="146" r="5.5" fill="#ff3131" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M 202 142 L 224 127" stroke="#ff3131" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="228" y="124" className="font-mono" fontSize="10" fill="#ff8092" fontWeight="bold">
            ⌖ YOU ARE HERE
          </text>

          {/* scale bar of questionable units */}
          <rect x="240" y="276" width="18" height="4" fill="#b4a8ff" />
          <rect x="258" y="276" width="18" height="4" fill="#241f4d" stroke="#b4a8ff" strokeWidth="1" />
          <rect x="276" y="276" width="18" height="4" fill="#b4a8ff" />
          <text x="240" y="269" className="font-mono" fontSize="8" fill="#8f86c9">
            SCALE: 1 BOX = 1 MOOD
          </text>
        </svg>

        {/* ---- legend (unverified) ---- */}
        <aside className="mt-3 -rotate-2 rounded-lg border-4 border-double border-[#b455ff] bg-[#191436] p-3 shadow-[8px_8px_0_0_#171438]">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#ffd60a]">❖ LEGEND (UNVERIFIED)</p>
          <ul className="mt-1.5 space-y-1 font-mono text-[11px] text-[#cfc6ff]">
            {LEGEND.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full border border-white/30"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* ---- caption ---- */}
        <p className="mt-4 text-center font-mono text-xs italic text-[#8f86c9]">
          *map accurate to 92% confidence (the 8% is clouds)
        </p>
      </div>

    </section>
  );
}