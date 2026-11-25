import type { HourlyWeather } from "@/lib/live-weather";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function dateLabel(day: string) {
  const [, month, date] = day.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(`${day}T00:00:00Z`).getUTCDay()];
  return `${weekday} ${month}/${date}`;
}

export function HourlyForecastStrip({ hourly, timezone }: { hourly: HourlyWeather[]; timezone: string }) {
  return (
    <section className="panel relative flex h-full flex-col bg-night p-5 sm:p-6">
      <style>{`
        .hourly-strip {
          scrollbar-width: thin;
          scrollbar-color: #ff2079 #1d1945;
          overscroll-behavior-x: contain;
        }
        .hourly-strip::-webkit-scrollbar {
          height: 12px;
        }
        .hourly-strip::-webkit-scrollbar-track {
          background: #1d1945;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
        }
        .hourly-strip::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #ff2079, #ff9500, #ffd60a, #32ff75);
          border-radius: 9999px;
          border: 2px solid #120f2e;
        }
        .hourly-strip::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #ffd60a, #24c6ff, #b455ff);
        }
      `}</style>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-white/60">Bureau of Approximate Skies</p>
          <h2 className="font-lobster text-3xl leading-tight text-white">Hour-by-Hour</h2>
        </div>
        <span className="sticker -rotate-2 bg-neon-green text-ink">Next {hourly.length} hours ⇄</span>
      </div>

      <div className="hourly-strip snap-x mt-5 -mx-1 overflow-x-auto">
        <ol className="flex w-max min-w-full items-stretch gap-3 px-1 pb-2 pt-1">
          {hourly.length === 0 ? (
            <li className="flex w-64 flex-none items-center justify-center rounded-2xl border-2 border-white/15 bg-night-2 p-4 text-center">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                no hourly data right now
              </p>
            </li>
          ) : (
            hourly.map((hour, i) => {
              const day = hour.time.slice(0, 10);
              const startsDay = i === 0 || !hourly[i - 1].time.startsWith(day);
              return (
                <li key={hour.time} className="min-w-32 flex-1 snap-start">
                  <div className="flex h-full flex-col rounded-2xl border-2 border-white/15 bg-night-2 p-3 text-center">
                    {startsDay ? (
                      <p className="eyebrow text-neon-cyan">{dateLabel(day)}</p>
                    ) : null}
                    <time
                      dateTime={hour.time}
                      className="mt-2 font-mono text-sm font-bold tracking-[0.2em] text-white"
                    >
                      {hour.time.slice(11)}
                    </time>
                    <div aria-hidden className="mt-3 text-4xl leading-none">
                      {hour.condition.icon}
                    </div>
                    <p className="mt-2 break-words font-mono text-xs font-bold uppercase leading-snug tracking-[0.12em] text-white/85">
                      {hour.condition.label}
                    </p>
                    <p className="mt-auto pt-3 font-mono text-4xl font-black leading-none tabular-nums text-neon-lime">
                      {hour.temperatureC}°
                    </p>
                  </div>
                </li>
              );
            })
          )}
        </ol>
      </div>

      <p className="mt-3 border-t border-white/15 pt-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/60">
        data: open-meteo · local timezone: {timezone} · endorsed by nobody
      </p>
    </section>
  );
}