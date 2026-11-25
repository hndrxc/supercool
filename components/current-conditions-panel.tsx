import type { CurrentWeather } from "@/lib/live-weather";

const CARDINALS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
] as const;

function cardinalFromDegrees(deg: number): string {
  return CARDINALS[Math.round(deg / 22.5) % 16];
}

type StatTile = {
  label: string;
  value: string;
  caption?: string;
};

export function CurrentConditionsPanel({ current }: { current: CurrentWeather }) {
  const cardinal = cardinalFromDegrees(current.windDirectionDegrees);

  const tiles: StatTile[] = [
    {
      label: "HUMIDITY",
      value: `${current.humidityPercent}%`,
      caption: "verified* (by a pigeon)",
    },
    {
      label: "WIND",
      value: `${current.windKmh} km/h`,
      caption: `${cardinal} · ${Math.round(current.windDirectionDegrees)}°`,
    },
    {
      label: "FEELS LIKE",
      value: `${current.apparentTemperatureC}°C`,
    },
    {
      label: "READING TIME",
      value: current.time.slice(11, 16),
      caption: "destination local",
    },
  ];

  return (
    <section className="panel @container min-w-0 flex h-full flex-col bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-ink/60">Department of Mild Concern</p>
          <h2 className="font-lobster text-3xl leading-tight text-ink">Current Conditions</h2>
        </div>
        <span className="sticker rotate-2 bg-neon-yellow text-ink">
          {current.condition.icon} live reading
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-5 @sm:flex-row @sm:items-end @sm:justify-between">
        <p className="font-mono text-[min(5.5rem,24cqw)] font-black leading-none tabular-nums text-ink">
          {`${current.temperatureC}°C`}
        </p>
        <div className="flex items-center gap-3 @sm:pb-2">
          <span aria-hidden className="text-4xl leading-none">{current.condition.icon}</span>
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-ink">
              {current.condition.label}
            </p>
            <p className="mt-1 font-mono text-xs text-ink/60">
              observed {current.time.slice(11, 16)} local
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex min-w-0 flex-col gap-1 rounded-2xl border-2 border-ink bg-white p-3"
          >
            <p className="eyebrow text-ink/55">{tile.label}</p>
            <p className="break-words font-mono text-[clamp(0.875rem,7cqw,1.5rem)] font-black tabular-nums text-ink">
              {tile.value}
            </p>
            {tile.caption ? (
              <p className="text-sm text-ink/60">{tile.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}