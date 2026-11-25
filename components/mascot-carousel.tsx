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
  const total = mascots.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % mascots.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const active = mascots[index];
  const color = NEON[hashName(active.name) % NEON.length];
  const chip = `${String(index + 1).padStart(2, "0")}/${total}`;

  return (
    <section className="mx-auto w-full max-w-sm">
      {/* the id-card */}
      <div className="rotate-2 border-4 border-dashed border-[#faff00] bg-[#221d4f] shadow-[10px_10px_0_0_#0f0c26]">
        {/* header strip */}
        <div className="flex items-center justify-between border-b-4 border-[#171438] bg-[#ff2ec4] px-4 py-2">
          <span className="font-lobster text-2xl leading-none text-[#171438]">MEET THE TEAM</span>
          <span className="font-mono text-[10px] font-bold text-[#171438]">STAFF ✷ 100% CERTIFIED</span>
        </div>

        {/* punched holes + lanyard slot */}
        <div className="mx-auto flex w-full max-w-[140px] items-center justify-between px-6 pt-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0f0c26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          <span className="h-1.5 w-12 rounded-full bg-[#0f0c26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0f0c26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
        </div>

        {/* the big weather-creature (re-mounts each tick so the bounce restarts) */}
        <div
          key={index}
          className="chaotic-bounce mx-auto mt-1 w-44"
          style={{ "--bounce-delay": `${(index * 0.13) % 1}s` } as CSSProperties}
        >
          <Creature mood={index % 3} color={color} />
        </div>

        {/* name + signature */}
        <h3
          className="mx-auto max-w-[260px] -rotate-1 px-2 text-center font-lobster text-5xl leading-tight"
          style={{ color, textShadow: "4px 4px 0 #0f0c26" }}
        >
          {active.name}
        </h3>
        <p className="mt-1 text-center font-mono text-xs italic text-[#9ad9ff]">“{active.signature}”</p>

        {/* index/total chip */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="border-2 border-[#171438] rounded-full bg-[#00e5ff] px-3 py-1 font-mono text-xs font-bold text-[#171438] shadow-[3px_3px_0_0_#0f0c26]">
            {chip}
          </span>
          <span className="font-mono text-[10px] text-[#b465ff]">STORM DEPT. ✦ SHIFT: NOW</span>
        </div>

        {/* avatar dots for every mascot */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 border-t-2 border-dashed border-[#5a4fbf] px-3 py-3">
          {mascots.map((m, i) => (
            <button
              key={m.name}
              type="button"
              aria-label={`Show ${m.name}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "chaotic-pulse h-6 w-6 scale-125 rounded-full border-2 border-[#171438] ring-4 ring-[#faff00]"
                  : "h-6 w-6 rounded-full border-2 border-[#171438] opacity-70 transition hover:scale-110"
              }
              style={
                {
                  backgroundColor: NEON[i % NEON.length],
                  "--chaos-delay": `${(i * 0.2) % 1.2}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* the badge stand */}
      <div className="mx-auto -mt-1 h-9 w-20 bg-[#171438] [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)]" />
      <div className="mx-auto h-3 w-44 rounded-full bg-[#0f0c26] shadow-[0_4px_0_0_#39ff14]" />
    </section>
  );
}

export default MascotCarousel;