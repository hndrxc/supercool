import type { CSSProperties } from "react";
import { alerts } from "@/lib/weather";

// CSS custom properties (like --chaos-delay) are not declared on CSSProperties,
// so extend it with a template-literal index signature instead of casting to any.
type ChaosStyle = CSSProperties & Record<`--${string}`, string | number>;

const paperColors = ["#fdf6d8", "#fbd9e0", "#d8f3dc", "#dbe7ff", "#fff3c4"];
const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1"];

export function WarningsBoard() {
  return (
    <section className="relative rounded-xl bg-amber-100 border-8 border-[#7c4a12] p-5 pt-10 shadow-[8px_8px_0_0_#171438]">
      {/* header plank */}
      <div className="absolute -top-6 left-1/2 w-[92%] -translate-x-1/2 -rotate-2 rounded-md bg-[#8b5a2b] border-4 border-[#5c3a15] px-6 py-3 shadow-[5px_5px_0_0_rgba(0,0,0,0.35)]">
        <h2 className="font-lobster text-3xl sm:text-4xl text-amber-50 tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]">
          DO NOT PANIC TOO HARDLY
        </h2>
        <p className="font-mono text-xs text-amber-200 mt-1">
          OFFICIAL WARNINGS — issued by the Department of (Mild) Concern
        </p>
      </div>

      {/* leftover cork-burrs on the board */}
      <div className="absolute top-2 left-4 h-3 w-3 rounded-full bg-[#2f2f2f] opacity-30" />
      <div className="absolute top-3 right-6 h-2.5 w-2.5 rounded-full bg-[#2f2f2f] opacity-30" />
      <div className="absolute top-14 left-10 h-2 w-2 rounded-full bg-[#2f2f2f] opacity-20" />

      {/* corkboard surface */}
      <div
        className="relative grid gap-6 rounded-lg p-4"
        style={{
          boxShadow: "inset 0 0 24px rgba(75, 41, 9, 0.45)",
          background:
            "radial-gradient(rgba(124,74,18,0.12) 1.5px, transparent 1.5px) 0 0 / 14px 14px, linear-gradient(160deg, #f3e3b8, #ead199)",
        }}
      >
        {alerts.map((alert, i) => (
          <article
            key={alert}
            className={`chaotic-wobble relative rounded-sm border-x-4 border-b-4 border-[#00000022] px-4 py-3 pt-5 shadow-[6px_6px_0_rgba(0,0,0,0.25)] ${rotations[i % rotations.length]}`}
            style={
              {
                backgroundColor: paperColors[i % paperColors.length],
                "--chaos-delay": `${-(i + 1) * 0.4}s`,
              } as ChaosStyle
            }
          >
            {/* red pin */}
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-red-500 border-2 border-red-800 shadow-[2px_3px_2px_rgba(0,0,0,0.4)]" />

            <h3 className="font-roboto-mono font-mono text-sm font-bold text-[#3a2a12] underline decoration-red-600">
              {`⚠ ${alert.split(":")[0]}`}
            </h3>
            <p className="mt-2 border-b-4 border-dashed border-[#00000055] pb-2 text-sm leading-snug text-[#4a3419]">
              {alert.includes(":") ? alert.split(":").slice(1).join(":") : alert}
            </p>

            {/* tiny corner curl */}
            <span className="absolute bottom-0 right-0 h-0 w-0 border-t-8 border-l-8 border-t-transparent border-l-amber-200/70" />
          </article>
        ))}

        {/* rubber-stamp fallback when the board is suspiciously quiet */}
        {alerts.length === 0 && (
          <article
            className="chaotic-wobble relative rounded-sm bg-[#fbd9e0] border-x-4 border-b-4 border-[#00000022] px-4 py-4 text-center shadow-[6px_6px_0_rgba(0,0,0,0.25)] -rotate-1"
            style={{ "--chaos-delay": "-1.2s" } as ChaosStyle}
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-red-500 border-2 border-red-800 shadow-[2px_3px_2px_rgba(0,0,0,0.4)]" />
            <p className="font-mono text-sm text-[#4a3419]">NO WARNINGS (suspiciously)</p>
          </article>
        )}
      </div>

      {/* bottom strip */}
      <div className="mt-4 rounded-md bg-[#171438] px-4 py-2 border-2 border-dashed border-amber-300 text-center">
        <p className="font-mono text-xs text-amber-200 tracking-widest">
          warnings are weather. weather is warnings.
        </p>
      </div>
    </section>
  );
}