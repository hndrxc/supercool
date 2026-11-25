import type { CSSProperties } from "react";
import { current } from "@/lib/weather";

// CSS custom properties (like --chaos-delay) are not declared on CSSProperties,
// so extend it with a template-literal index signature instead of casting to any.
type ChaosStyle = CSSProperties & Record<`--${string}`, string | number>;

type Seal = {
  caption: string;
  star: boolean;
  color: string;
  rotation: string;
  delay: string;
};

const seals: Seal[] = [
  { caption: "CALIBRATED", star: true, color: "#00f5ff", rotation: "-rotate-12", delay: "-0.2s" },
  { caption: "INSPECTED BY CLOUDS", star: false, color: "#ff2ec4", rotation: "rotate-6", delay: "-0.7s" },
  { caption: "92% ACCURATE*", star: true, color: "#aaff00", rotation: "-rotate-3", delay: "-1.1s" },
  { caption: "RAIN-SAFE", star: false, color: "#ffe600", rotation: "rotate-12", delay: "-1.6s" },
  { caption: "NOT LEGALLY BINDING", star: true, color: "#b26bff", rotation: "-rotate-6", delay: "-2.1s" },
];

function StarIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill={color} aria-hidden="true">
      <path d="M12 2l2.9 6.26 6.85.73-5.1 4.6 1.4 6.74L12 16.9 5.95 20.33l1.4-6.74-5.1-4.6 6.85-.73L12 2z" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 13l5 5L20 6" />
    </svg>
  );
}

export function FooterCertifications() {
  return (
    <footer className="relative border-t-4 border-double border-[#00f5ff] bg-[#171438] px-6 pt-10 pb-16">
      {/* row of fake certification seals */}
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-x-10 gap-y-8">
        {seals.map((seal, i) => (
          <div key={seal.caption} className="flex w-32 flex-col items-center gap-2">
            <div
              className={`chaotic-wobble flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed bg-[#100e24] shadow-[4px_4px_0_0_rgba(0,0,0,0.55)] ${seal.rotation}`}
              style={{ borderColor: seal.color, "--chaos-delay": seal.delay } as ChaosStyle}
            >
              {seal.star ? <StarIcon color={seal.color} /> : <CheckIcon color={seal.color} />}
            </div>
            <p className="text-center font-mono text-[8px] tracking-[0.25em] opacity-50">
              OFFICIAL SEAL Nº 00{i + 1}
            </p>
            <p className="text-center font-mono text-[10px] leading-tight tracking-[0.18em]" style={{ color: seal.color }}>
              {seal.caption}
            </p>
          </div>
        ))}
      </div>

      {/* the big legally-meaningless statement */}
      <p className="chaotic-rainbow font-lobster mx-auto mt-10 max-w-4xl text-center text-3xl leading-tight drop-shadow-[3px_3px_0_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl">
        WEATHER.EXE is not affiliated with the weather, the sky, or the ground (© 2026)
      </p>

      {/* fine print, mostly to look busy */}
      <p className="mx-auto mt-6 max-w-2xl text-center font-mono text-[10px] leading-relaxed opacity-70">
        *accuracy measured by a very confident cloud. certified by the International Bureau of Vibes ·
        uv self-report: {current.uvIndex} · rain liability excluded (see clause 4.2b, “squall”). no refunds, only forecasts.
      </p>
    </footer>
  );
}