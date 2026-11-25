"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { mascots } from "@/lib/weather";

const NEON = [
  "#39ff14",
  "#ff2ec4",
  "#00e5ff",
  "#faff00",
  "#ff9f1c",
  "#b465ff",
  "#ff4911",
  "#00ff9f",
  "#3d7bff",
  "#ff6ec7",
];

const INK = "#171438";

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h;
}

/* mood: 0 = smile, 1 = squint, 2 = gritted-teeth arc */
function Creature({ mood, color }: { mood: number; color: string }) {
  return (
    <svg
      viewBox="0 0 220 200"
      fill="none"
      aria-hidden
      className="w-full drop-shadow-[5px_5px_0_rgba(15,12,38,0.45)]"
    >
      {/* antenna */}
      <line x1="110" y1="64" x2="110" y2="36" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="110" cy="28" r="9" fill="#faff00" stroke={INK} strokeWidth="4" />
      {/* arms */}
      <ellipse
        cx="36"
        cy="130"
        rx="15"
        ry="9"
        fill={color}
        stroke={INK}
        strokeWidth="5"
        transform="rotate(-25 36 130)"
      />
      <ellipse
        cx="184"
        cy="130"
        rx="15"
        ry="9"
        fill={color}
        stroke={INK}
        strokeWidth="5"
        transform="rotate(25 184 130)"
      />
      {/* feet */}
      <ellipse cx="82" cy="184" rx="17" ry="10" fill={color} stroke={INK} strokeWidth="5" />
      <ellipse cx="138" cy="184" rx="17" ry="10" fill={color} stroke={INK} strokeWidth="5" />
      {/* body */}
      <ellipse cx="110" cy="122" rx="74" ry="62" fill={color} stroke={INK} strokeWidth="5" />
      <ellipse cx="110" cy="142" rx="46" ry="30" fill="#ffffff" opacity="0.22" />
      {/* sparkle on the shell */}
      <path
        d="M 158 74 l 4.5 11 11 4.5 -11 4.5 -4.5 11 -4.5 -11 -11 -4.5 11 -4.5 z"
        fill="#ffffff"
        opacity="0.85"
      />
      {/* blush */}
      <ellipse cx="60" cy="126" rx="10" ry="6" fill="#ff2ec4" opacity="0.5" />
      <ellipse cx="160" cy="126" rx="10" ry="6" fill="#ff2ec4" opacity="0.5" />
      {/* face */}
      {mood === 1 ? (
        <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M 70 102 Q 85 112 100 102" />
          <path d="M 120 102 Q 135 112 150 102" />
          <path d="M 88 138 Q 110 150 132 138" />
        </g>
      ) : mood === 2 ? (
        <g>
          <line x1="66" y1="84" x2="98" y2="94" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line x1="154" y1="84" x2="122" y2="94" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="84" cy="104" r="14" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="136" cy="104" r="14" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="84" cy="104" r="5" fill={INK} />
          <circle cx="136" cy="104" r="5" fill={INK} />
          {/* gritted-teeth arc */}
          <path d="M 70 128 Q 110 174 150 128 Z" fill={INK} />
          <path d="M 78 130 L 142 130 L 142 139 Q 110 148 78 139 Z" fill="#ffffff" stroke={INK} strokeWidth="3" />
          <line x1="94" y1="131" x2="94" y2="142" stroke={INK} strokeWidth="3" />
          <line x1="110" y1="131" x2="110" y2="143" stroke={INK} strokeWidth="3" />
          <line x1="126" y1="131" x2="126" y2="142" stroke={INK} strokeWidth="3" />
        </g>
      ) : (
        <g>
          <circle cx="85" cy="102" r="13" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="135" cy="102" r="13" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="88" cy="105" r="5.5" fill={INK} />
          <circle cx="138" cy="105" r="5.5" fill={INK} />
          <path d="M 78 132 Q 110 158 142 132" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

export function MascotCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = mascots.length;

  useEffect(() => {
    if (paused) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % mascots.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  const active = mascots[index];
  const color = NEON[hashName(active.name) % NEON.length];
  const chip = `${String(index + 1).padStart(2, "0")}/${total}`;

  return (
    <section
      className="panel flex h-full flex-col bg-paper p-5 sm:p-6 @container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* header row: department label + title, one sticker on the right */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-ink">Mascot Personnel</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-ink">Meet the Staff</h2>
        </div>
        <span className="sticker shrink-0 bg-neon-yellow text-ink -rotate-2">Parody</span>
      </div>

      {/* body: creature, name, signature, counter, avatar dots */}
      <div className="mt-5 flex flex-1 flex-col items-center">
        <div
          key={index}
          className="chaotic-bounce w-44"
          style={{ "--bounce-delay": `${(index * 0.13) % 1}s` } as CSSProperties}
        >
          <Creature mood={index % 3} color={color} />
        </div>

        <h3 className="mt-2 max-w-full break-words text-center font-lobster text-3xl leading-tight text-ink">
          {active.name}
        </h3>
        <p className="mt-1 text-center font-mono text-sm italic text-ink/85">“{active.signature}”</p>

        <span className="sticker mt-4 bg-neon-cyan text-ink">{chip}</span>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {mascots.map((m, i) => (
            <button
              key={m.name}
              type="button"
              aria-label={`Show ${m.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-5 w-5 cursor-pointer rounded-full border-2 border-ink ring-2 ring-neon-orange/80 transition scale-110"
                  : "h-5 w-5 cursor-pointer rounded-full border-2 border-ink/40 opacity-70 transition hover:scale-110 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              }
              style={{ backgroundColor: NEON[i % NEON.length] }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MascotCarousel;