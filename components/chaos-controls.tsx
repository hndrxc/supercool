"use client";

import { useEffect, useState } from "react";

type SpeedChoice = {
  value: number;
  label: string;
  emoji: string;
  bg: string;
};

const SPEED_CHOICES: SpeedChoice[] = [
  { value: 0.5, label: "Slow-Motion Mode", emoji: "🐌", bg: "#00e5ff" },
  { value: 1, label: "Certified Normal", emoji: "🙂", bg: "#39ff14" },
  { value: 2, label: "Party Mode", emoji: "🪩", bg: "#ff2fd0" },
  { value: 4, label: "Emergency Chaos", emoji: "🚨", bg: "#ffe217" },
  { value: 8, label: "Warranty Void", emoji: "☢️", bg: "#ff3131" },
];

export function ChaosControls() {
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty("--chaos", String(speed));
    return () => {
      document.documentElement.style.setProperty("--chaos", "1");
    };
  }, [speed]);

  return (
    <section className="panel flex h-full flex-col bg-night p-5 sm:p-6 @container">
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <p className="eyebrow text-neon-cyan">DEPT. OF MILD CONCERN · CONTROL ROOM 7</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-neon-yellow">Chaos Console</h2>
          <p className="mt-1 font-mono text-xs text-[#b4a8ff]">mixing desk for reality, incl. regret</p>
        </div>
        <span className="sticker rotate-2 bg-neon-pink text-ink">Parody · Mixing Desk</span>
      </header>

      <div className="mt-5 grid flex-1 grid-cols-1 gap-5 @lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] @lg:items-stretch">
        {/* LED readout */}
        <div className="flex items-center justify-center rounded-2xl border-2 border-[#143d24] bg-[#03130a] px-6 py-8 shadow-[inset_0_0_30px_rgba(57,255,20,0.28)]">
          <div className="text-center">
            <div
              className={`font-mono text-[clamp(3.5rem,18cqw,6rem)] leading-none font-bold tracking-[0.08em] text-[#39ff14] tabular-nums [text-shadow:0_0_18px_rgba(57,255,20,0.9)] ${
                speed > 2 ? "chaotic-pulse" : ""
              }`}
            >
              {speed}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#39ff14]/60">× reality speed</div>
          </div>
        </div>

        {/* speed keys */}
        <div className="grid grid-cols-1 gap-3 self-center @sm:grid-cols-2 @lg:grid-cols-5">
          {SPEED_CHOICES.map((choice) => {
            const active = speed === choice.value;
            return (
              <button
                key={choice.value}
                type="button"
                aria-pressed={active}
                onClick={() => setSpeed(choice.value)}
                style={{ backgroundColor: choice.bg }}
                className={`flex min-h-20 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-ink px-3 py-3 text-center text-ink shadow-[3px_3px_0_0_#171438] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active ? "-translate-y-0.5 ring-2 ring-white" : "hover:-translate-y-0.5"
                }`}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {choice.emoji}
                </span>
                <span className="font-mono text-xs font-bold uppercase leading-tight [overflow-wrap:anywhere]">{choice.label}</span>
                <span className="font-mono text-xs font-bold tabular-nums">×{choice.value}</span>
              </button>
            );
          })}
        </div>

        {/* reset */}
        <div className="flex items-center justify-center @lg:justify-end">
          <button
            type="button"
            onClick={() => setSpeed(1)}
            className="rounded-xl border-2 border-ink bg-[#a7ff00] px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_#171438] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            🔧 Reset Calibration
          </button>
        </div>
      </div>

      <footer className="mt-auto pt-4">
        <div className="border-t border-[#332c66]" />
        <p className="mt-3 text-center font-mono text-xs text-[#8f86c9]">
          *calibrates nothing, obviously · speeds measured in vibes · warranty void at 8×
        </p>
      </footer>
    </section>
  );
}
