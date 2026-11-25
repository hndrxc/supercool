import type { CSSProperties } from "react";

type ChaosStyle = CSSProperties & Record<`--${string}`, string | number>;

type HourCard = {
  time: string;
  temp: number;
  icon: string;
  condition: string;
  neon: string;
};

const HOURS: HourCard[] = [
  { time: "16:00", temp: 41, icon: "🌞", condition: "Sunnyish", neon: "#ffd60a" },
  { time: "17:00", temp: 9, icon: "🧶", condition: "RAG SONG", neon: "#ff2079" },
  { time: "18:00", temp: 27, icon: "🌤️", condition: "Sun-shine-lite", neon: "#ff9500" },
  { time: "19:00", temp: 12, icon: "🌧️", condition: "LOUD DRIZZLE", neon: "#24c6ff" },
  { time: "20:00", temp: 33, icon: "🏛️", condition: "Golden Ruin", neon: "#ffb700" },
  { time: "21:00", temp: 18, icon: "💨", condition: "Windy-ish Prime", neon: "#a7ff00" },
  { time: "22:00", temp: 25, icon: "☁️", condition: "Cloud of Suspense", neon: "#b455ff" },
  { time: "23:00", temp: 14, icon: "😴", condition: "Napping", neon: "#32ff75" },
];

const BORDER_STYLES = ["solid", "dashed", "double"] as const;

export function HourlyForecastStrip() {
  return (
    <section className="relative -rotate-[0.4deg] border-4 border-black bg-[#241447] p-5 shadow-[10px_10px_0_0_#ff2fd0]">
      <style>{`
        .hourly-strip {
          scrollbar-width: thin;
          scrollbar-color: #ff2079 #12092b;
        }
        .hourly-strip::-webkit-scrollbar {
          height: 12px;
        }
        .hourly-strip::-webkit-scrollbar-track {
          background: #12092b;
          border: 2px dashed #ff2079;
          border-radius: 8px;
        }
        .hourly-strip::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #ff2079, #ffd60a, #32ff75, #b455ff);
          border-radius: 8px;
          border: 2px solid #12092b;
        }
        .hourly-strip::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #ffd60a, #ff2079, #24c6ff);
        }
      `}</style>

      {/* rainbow dashed top border: gradient bar, mask-cut into dashes */}
      <div
        aria-hidden
        className="absolute -top-[9px] inset-x-2 h-2"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ff2079, #ff9500, #ffd60a, #32ff75, #24c6ff, #b455ff, #ff2079)",
          backgroundSize: "200% 100%",
          WebkitMaskImage:
            "repeating-linear-gradient(90deg, #000 0 16px, transparent 16px 28px)",
          maskImage:
            "repeating-linear-gradient(90deg, #000 0 16px, transparent 16px 28px)",
        }}
      />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="chaotic-rainbow font-lobster text-3xl leading-none sm:text-4xl">
            HOUR-BY-HOUR CHAOS
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#b7a8e8]">
            next 8 hours · accuracy 37% (unverified by anyone)
          </p>
        </div>
        <span className="chaotic-flicker -rotate-6 border-2 border-dashed border-[#a7ff00] px-3 py-1 font-mono text-[10px] font-black tracking-[0.3em] text-[#a7ff00] shadow-[4px_4px_0_0_#12092b]">
          SCROLL ⇄ FOR VIBES
        </span>
      </div>

      <div
        className="hourly-strip -mx-1 mt-2 overflow-x-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#ff2079 #12092b" }}
      >
        <ol className="flex w-max items-stretch gap-6 px-4 pt-8 pb-4">
          {HOURS.map((hour, i) => (
            <li
              key={hour.time}
              style={{
                transform: i % 2 === 0 ? "rotate(1.75deg)" : "rotate(-2.25deg)",
              }}
            >
              <div
                className="chaotic-bounce w-40 flex-none border-[3px] bg-[#150b30] px-4 py-4 text-center shadow-[6px_6px_0_0_#ff2fd0]"
                style={{
                  "--bounce-delay": `${(i * 0.1).toFixed(1)}s`,
                  borderColor: hour.neon,
                  borderStyle: BORDER_STYLES[i % BORDER_STYLES.length],
                } as ChaosStyle}
              >
                <p
                  className="font-mono text-[11px] font-bold tracking-[0.3em]"
                  style={{ color: hour.neon, textShadow: `0 0 10px ${hour.neon}` }}
                >
                  {hour.time}
                </p>
                <div className="mt-2 text-4xl leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                  {hour.icon}
                </div>
                <p
                  className="mt-2 font-mono text-[10px] font-black uppercase tracking-[0.18em]"
                  style={{ color: hour.neon, textShadow: `0 0 8px ${hour.neon}` }}
                >
                  {hour.condition}
                </p>
                <p
                  className="font-roboto-mono text-5xl font-black leading-none"
                  style={{ color: hour.neon, textShadow: `0 0 16px ${hour.neon}` }}
                >
                  {hour.temp}°
                </p>
                <p className="mt-2 font-mono text-[10px] text-[#b7a8e8]">
                  high of {hour.temp}°C (trust us)
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b7a8e8]/70">
        ⚠️ times imaginary · temperatures emotional · do not schedule anything
      </p>
    </section>
  );
}