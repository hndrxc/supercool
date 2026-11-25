import type { ReactNode } from "react";
import { current } from "@/lib/weather";

const neonWordColors = [
  "#ff2fd0",
  "#00ff9d",
  "#ffe217",
  "#00e5ff",
  "#a7ff00",
];

type StatTile = {
  label: string;
  value: ReactNode;
  caption?: string;
  delay: string;
  span?: boolean;
};

function FeelsLike() {
  return (
    <span className="whitespace-normal">
      {'a rug that walks'.split(" ").map((word, i) => (
        <span key={i} className="mr-2 inline-block">
          <span
            className="font-roboto-mono inline-block font-black"
            style={{ color: neonWordColors[i % neonWordColors.length] }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function CurrentConditionsPanel() {
  const tiles: StatTile[] = [
    {
      label: "HUMIDITY",
      value: (
        <span>
          {current.humidity}%
          <sup className="ml-1 font-roboto-mono text-xs">verified*</sup>
        </span>
      ),
      caption: "verified* (by a pigeon)",
      delay: "0.1s",
    },
    {
      label: "WIND",
      value: `${current.windKmh} km/h`,
      caption: current.windDirection,
      delay: "0.3s",
    },
    {
      label: "UV INDEX",
      value: current.uvIndex,
      caption: "do not stare",
      delay: "0.5s",
    },
    {
      label: "STORM DIAMETER",
      value: `${current.stormDiameterM} m`,
      caption: "and growing (mildly)",
      delay: "0.7s",
    },
    {
      label: "FEELS LIKE",
      value: <FeelsLike />,
      delay: "0.9s",
      span: true,
    },
  ];

  return (
    <section className="@container min-w-0 rotate-1 border-4 border-black bg-[#eaff00] p-5 shadow-[12px_12px_0_0_#171438]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-roboto-mono text-xs font-bold uppercase tracking-[0.25em] text-[#171438]/70">
          current conditions · live-ish
        </h2>
        <div className="chaotic-bounce shrink-0 -rotate-6 border-4 border-double border-black bg-[#ff2fd0] px-3 py-2 shadow-[5px_5px_0_0_#171438]">
          <p className="font-roboto-mono text-sm font-black uppercase text-black">
            {current.condition}
          </p>
          <p className="font-roboto-mono text-[10px] italic text-black/70">{current.modifier}</p>
        </div>
      </div>
      <p className="chaotic-rainbow font-roboto-mono mt-4 whitespace-nowrap text-[min(6rem,24cqw)] leading-none font-black">
        {`${current.temperatureC}°C`}
      </p>
      <p className="mt-2 font-lobster text-2xl text-[#171438]">how it feels</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`chaotic-wobble border-4 border-dashed border-black bg-[#fff7e8] p-3 ${tile.span ? "col-span-2" : ""}`}
            style={{ ["--chaos-delay" as string]: tile.delay }}
          >
            <p className="font-roboto-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#171438]/60">
              {tile.label}
            </p>
            <p className="font-roboto-mono text-[clamp(0.875rem,7cqw,1.5rem)] font-black break-words text-[#171438]">{tile.value}</p>
            {tile.caption ? (
              <p className="font-lobster text-sm text-[#171438]/80">{tile.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}