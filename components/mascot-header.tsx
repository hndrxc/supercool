import type { CSSProperties } from "react";
import { mascots } from "@/lib/weather";

const puff = mascots[0] ?? { name: "Puff", signature: "cloud with a diploma" };

const spinStyleA = { "--spin-s": "3.4s", "--spin-delay": "0.2s" } as CSSProperties;
const spinStyleB = { "--spin-s": "2.1s", "--spin-delay": "0.9s" } as CSSProperties;
const bounceStyle = { "--bounce-delay": "0.15s" } as CSSProperties;
const flickerStyle = { "--flicker-delay": "0.6s" } as CSSProperties;

const INK = "#171438";
const PINK = "#ff3d6e";
const GOLD = "#ffd23f";
const ACID = "#d4ff4f";

export function MascotHeader() {
  return (
    <div className="relative w-full -rotate-2 border-4 border-dashed border-[#171438] bg-white px-4 py-3 shadow-[8px_10px_0_0_#171438] sm:px-6 sm:py-4 sm:shadow-[10px_12px_0_0_#171438]">
      {/* washi tape, obviously load-bearing */}
      <div
        aria-hidden
        className="absolute -top-3 left-8 h-5 w-20 rotate-[-6deg] border-2 border-dashed border-[#171438] bg-[#d4ff4f]/80"
      />
      <div
        aria-hidden
        className="absolute -top-2 right-6 h-4 w-14 rotate-[5deg] border-2 border-dashed border-[#171438] bg-[#ff3d6e]/70"
      />

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        {/* ======================= THE FIGURE ======================= */}
        <svg
          viewBox="0 0 200 170"
          className="chaotic-bounce h-20 w-20 shrink-0 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          style={bounceStyle}
          role="img"
          aria-label="Puff, a cloud wearing a graduation cap and scarf"
        >
          {/* cloud body — bumpy, one continuous path */}
          <path
            d="M 50 115
               a 20 20 0 0 1 0 -40
               a 25 25 0 0 1 45 -22
               a 27 27 0 0 1 50 4
               a 21 21 0 0 1 8 42
               a 17 17 0 0 1 -6 16
               L 50 115 Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* graduation cap base */}
          <rect x="92" y="24" width="26" height="12" rx="3" fill={INK} />
          {/* mortarboard, tilted with authority */}
          <g transform="rotate(-7 105 20)">
            <path d="M 105 9 L 131 20 L 105 31 L 79 20 Z" fill={INK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="105" cy="20" r="2.5" fill={GOLD} />
          </g>
          {/* tassel */}
          <path d="M 130 22 Q 139 28 139 40" fill="none" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="139" cy="44" r="4" fill={GOLD} stroke={INK} strokeWidth="2" />

          {/* googly-ish eyes */}
          <circle cx="86" cy="86" r="10.5" fill="#ffffff" stroke={INK} strokeWidth="3" />
          <circle cx="84" cy="89" r="4" fill={INK} />
          <circle cx="82.5" cy="87" r="1.4" fill="#ffffff" />
          <circle cx="118" cy="84" r="9" fill="#ffffff" stroke={INK} strokeWidth="3" />
          <circle cx="119.5" cy="86.5" r="3.5" fill={INK} />
          <circle cx="118" cy="84.5" r="1.2" fill="#ffffff" />

          {/* blushed cheeks of competence */}
          <ellipse cx="71" cy="98" rx="5.5" ry="3.5" fill="#ffb3c1" />
          <ellipse cx="133" cy="95" rx="5.5" ry="3.5" fill="#ffb3c1" />

          {/* the confident little mouth */}
          <path d="M 95 101 q 7 6 14 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />

          {/* ================= SPIN PART 1: rotating star pin ================= */}
          <g transform="translate(143 76)">
            <g className="chaotic-spin" style={spinStyleA}>
              <path
                d="M 0 -11 L 3.4 -3.4 L 11 0 L 3.4 3.4 L 0 11 L -3.4 3.4 L -11 0 L -3.4 -3.4 Z"
                fill={ACID}
                stroke={INK}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* ================= SPIN PART 2: rotating sun pin ================= */}
          <g transform="translate(62 74)">
            <g className="chaotic-spin" style={spinStyleB}>
              <g stroke={INK} strokeWidth="3" strokeLinecap="round">
                <line x1="0" y1="-12" x2="0" y2="-7" />
                <line x1="0" y1="7" x2="0" y2="12" />
                <line x1="-12" y1="0" x2="-7" y2="0" />
                <line x1="7" y1="0" x2="12" y2="0" />
                <line x1="-8.5" y1="-8.5" x2="-5" y2="-5" />
                <line x1="5" y1="5" x2="8.5" y2="8.5" />
                <line x1="8.5" y1="-8.5" x2="5" y2="-5" />
                <line x1="-5" y1="5" x2="-8.5" y2="8.5" />
              </g>
              <circle cx="0" cy="0" r="5" fill={GOLD} stroke={INK} strokeWidth="2.5" />
            </g>
          </g>

          {/* small scarf, wrapped around the bottom of the cloud */}
          <path
            d="M 44 104 Q 96 121 152 104 L 152 118 Q 96 135 44 118 Z"
            fill={PINK}
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 58 107 Q 96 119 140 107" fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
          {/* scarf tail, dangling with purpose */}
          <g transform="rotate(-9 134 120)">
            <rect x="126" y="116" width="16" height="26" rx="4" fill={PINK} stroke={INK} strokeWidth="3" />
            <line x1="130" y1="142" x2="130" y2="149" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="134" y1="142" x2="134" y2="150" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="138" y1="142" x2="138" y2="149" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>

        {/* ======================= THE WORDS ======================= */}
        <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-1 sm:items-start sm:text-left sm:gap-2.5">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#ff3d6e] sm:text-[10px]">
            ✦ resident cloud authority ✦
          </p>

          <p className="font-lobster text-2xl leading-tight text-[#171438] sm:text-3xl lg:text-4xl">
            GREETINGS FROM <span className="inline-block -rotate-2 bg-[#d4ff4f] px-2 [box-decoration-break:clone] sm:px-3">PUFF</span>
          </p>

          <p className="font-mono text-xs italic text-[#171438]/80 sm:text-sm">
            ✍ {puff.signature}
          </p>

          <div className="inline-flex rotate-2 items-center gap-2 border-2 border-dashed border-[#171438] bg-[#7cffce] px-3 py-1 text-[10px] shadow-[3px_3px_0_0_#171438] sm:text-xs">
            <span className="chaotic-flicker" style={flickerStyle}>
              ⚡ he is very qualified ⚡
            </span>
          </div>

          <p className="mt-0.5 font-mono text-[9px] text-[#171438]/50 sm:text-[10px]">
            * qualifications verified by an imaginary accrediting body
          </p>
        </div>
      </div>
    </div>
  );
}