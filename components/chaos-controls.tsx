"use client";

import { useEffect, useState } from "react";

type SpeedChoice = {
  value: number;
  label: string;
  emoji: string;
  bg: string;
};

const SPEED_CHOICES: SpeedChoice[] = [
  { value: 0.5, label: "HALF-Speed Mode", emoji: "🐌", bg: "#00e5ff" },
  { value: 1, label: "Certified Normal", emoji: "🙂", bg: "#39ff14" },
  { value: 2, label: "Party Mode", emoji: "🪩", bg: "#ff2fd0" },
  { value: 4, label: "Emergency Chaos", emoji: "🚨", bg: "#ffe217" },
  { value: 8, label: "THIS CANCELS YOUR WARRANTY", emoji: "☢️", bg: "#ff3131" },
];

function Screw({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-4 w-4 rounded-full bg-gradient-to-br from-[#9aa3c4] to-[#3a3f5e] shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 h-[2px] w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#1c1f33]" />
    </div>
  );
}

export function ChaosControls() {
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty("--chaos", String(speed));
    return () => {
      document.documentElement.style.setProperty("--chaos", "1");
    };
  }, [speed]);

  return (
    <section className="@container relative -rotate-1 border-[6px] border-double border-[#5b4bd8] bg-[#0d0a24] p-6 shadow-[10px_10px_0_0_#171438]">
      <Screw className="left-2 top-2" />
      <Screw className="right-2 top-2" />
      <Screw className="bottom-2 left-2" />
      <Screw className="bottom-2 right-2" />

      <div className="text-center">
        <h2 className="font-lobster text-[clamp(1.75rem,13cqw,3rem)] leading-tight text-[#39ff14] [text-shadow:2px_2px_0_#ff2fd0,5px_5px_0_#171438]">
          THE CHAOS CONSOLE
        </h2>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.35em] text-[#00e5ff]/80">
          speed controls for everything, incl. regret
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-md border-4 border-black bg-black px-6 py-4 shadow-[inset_0_0_26px_rgba(57,255,20,0.35)]">
        <div
          className={`text-center font-mono text-[min(5rem,24cqw)] leading-none font-bold tracking-[0.1em] text-[#39ff14] [text-shadow:0_0_18px_rgba(57,255,20,0.9)] ${
            speed > 2 ? "chaotic-pulse" : ""
          }`}
        >
          {speed}
        </div>
        <div className="mt-1 text-center font-mono text-xs uppercase tracking-[0.2em] text-[#39ff14]/60">
          × reality speed
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
        {SPEED_CHOICES.map((choice) => {
          const active = speed === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              onClick={() => setSpeed(choice.value)}
              style={{ backgroundColor: choice.bg }}
              className={`min-w-0 border-4 border-black px-2 py-2 text-left text-black shadow-[5px_5px_0_0_#f2f2f2] transition-transform last:col-span-2 ${
                active ? "scale-105 ring-4 ring-white" : ""
              }`}
            >
              <span className="block font-lobster text-lg leading-tight [overflow-wrap:anywhere]">
                {choice.emoji} {choice.label}
              </span>
              <span className="font-mono text-xs font-bold">×{choice.value}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <button
          type="button"
          onClick={() => setSpeed(1)}
          className="chaotic-pulse border-4 border-black bg-[#a7ff00] px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-black shadow-[5px_5px_0_0_#f2f2f2]"
        >
          🔧 RESET CALIBRATION
        </button>
        <span className="text-center font-mono text-[10px] uppercase tracking-widest text-[#9aa3c4]">
          *(calibrates nothing)*
        </span>
      </div>
    </section>
  );
}