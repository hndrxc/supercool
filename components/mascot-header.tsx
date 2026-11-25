import type { CSSProperties } from "react";
import { mascots } from "@/lib/weather";

const puff = mascots[0] ?? { name: "Puff", signature: "" };

const spinStyleA = { "--spin-s": "3.4s", "--spin-delay": "0.2s" } as CSSProperties;
const spinStyleB = { "--spin-s": "2.1s", "--spin-delay": "0.9s" } as CSSProperties;
const bounceStyle = { "--bounce-delay": "0.15s" } as CSSProperties;

const INK = "#171438";
const PINK = "#ff3d6e";
const GOLD = "#ffd23f";
const ACID = "#d4ff4f";

export function MascotHeader() {
  return (
    <section className="panel flex h-full flex-col bg-paper p-5 sm:p-6 @container">
      {/* header row: department label + title, one sticker on the right */}
      <div className="flex flex-col gap-3 @[380px]:flex-row @[380px]:items-start @[380px]:justify-between">
        <div className="min-w-0">
          <p className="eyebrow text-ink">Resident Cloud Authority</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-ink">
            Greetings from {puff.name}
          </h2>
        </div>
        <span className="sticker self-start bg-neon-lime text-ink rotate-2">He is very qualified</span>
      </div>

      {/* body: the charming Puff illustration + signature */}
      <div className="mt-5 flex flex-1 flex-col items-center gap-5 @[380px]:flex-row @[380px]:items-center @[380px]:gap-7">
        <svg
          viewBox="0 0 200 170"
          className="chaotic-bounce h-24 w-24 shrink-0 @[380px]:h-28 @[380px]:w-28"
          style={bounceStyle}
          role="img"
          aria-label={`${puff.name}, a cloud wearing a graduation cap and scarf`}
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

        <div className="flex flex-col items-center gap-2 text-center @[380px]:items-start @[380px]:text-left">
          {puff.signature ? (
            <p className="font-mono text-sm italic text-ink/85">✍ {puff.signature}</p>
          ) : null}
        </div>
      </div>

      {/* fine print, pinned to the foot of the card */}
      <div className="mt-auto pt-5">
        <div className="mb-3 border-t border-ink/15" />
        <p className="font-mono text-xs leading-relaxed text-ink/90">
          * Qualifications verified by an imaginary accrediting body. Résumé available on request.
        </p>
      </div>
    </section>
  );
}