'use client';

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { barometerStatusFor } from "@/lib/weather";

export function BarometerGauge() {
  const [meter, setMeter] = useState(743);

  useEffect(() => {
    const id = setInterval(() => {
      setMeter((m) => Math.min(820, Math.max(700, m + (Math.random() * 28 - 14))));
    }, 250);
    return () => clearInterval(id);
  }, []);

  const status = barometerStatusFor(meter);
  const deg = 10 + ((meter - 700) / (820 - 700)) * 160;

  return (
    <section
      className="chaotic-wobble @container relative -rotate-1 w-full rounded-3xl border-4 border-double border-[#171438] bg-gradient-to-br from-pink-400 via-fuchsia-600 to-purple-700 p-6 shadow-[8px_8px_0_0_#171438]"
      style={{ "--chaos-delay": "3.7s" } as CSSProperties}
    >
      <span className="absolute -right-3 -top-4 -rotate-6 rounded-md border-2 border-[#171438] bg-[#ffd23e] px-2 py-1 font-mono text-xs font-black text-[#171438] shadow-[3px_3px_0_0_#171438]">
        PSI-SAFE™ ✨
      </span>

      <h2 className="font-mono text-xl font-black uppercase tracking-[0.3em] text-[#fffdf2] drop-shadow-[2px_2px_0_#171438]">
        🌀 the mood-o-meter 🌀
      </h2>

      <svg viewBox="0 0 200 118" className="mx-auto mt-3 w-full" role="img" aria-label="Barometer mood gauge">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#2a1558" strokeWidth="18" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 60 30.72" fill="none" stroke="#46e66b" strokeWidth="12" />
        <path d="M 60 30.72 A 80 80 0 0 1 140 30.72" fill="none" stroke="#ffd23e" strokeWidth="12" />
        <path d="M 140 30.72 A 80 80 0 0 1 180 100" fill="none" stroke="#ff3b3b" strokeWidth="12" />
        <text x="20" y="116" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          700
        </text>
        <text x="100" y="8" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          760
        </text>
        <text x="180" y="116" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#fffdf2">
          820
        </text>
        <g
          style={{
            transform: `rotate(${deg}deg)`,
            transformOrigin: "100px 100px",
            transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <line x1="100" y1="100" x2="44" y2="100" stroke="#171438" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="100" r="4" fill="#fffdf2" />
        </g>
        <circle cx="100" cy="100" r="7" fill="#171438" stroke="#fffdf2" strokeWidth="2" />
      </svg>

      <p className="mt-3 whitespace-nowrap text-center font-mono text-[min(3.75rem,16cqw)] font-black tabular-nums text-[#fffdf2] drop-shadow-[4px_4px_0_#171438]">
        {meter.toFixed(1) + " hPa"}
      </p>
      <p className="chaotic-pulse mt-2 text-center font-lobster text-3xl text-[#fffdf2]">{status.label}</p>
      <p className="mt-1 text-center font-mono text-xs italic text-fuchsia-100">“{status.note}”</p>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-fuchsia-200/80">
        calibrated nightly by a skeptical meteorologist
      </p>
    </section>
  );
}