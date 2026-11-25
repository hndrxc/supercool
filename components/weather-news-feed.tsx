import { newsFeeds } from "@/lib/weather";

export function WeatherNewsFeed() {
  return (
    <section className="panel flex h-full flex-col bg-white p-5 sm:p-6 @container">
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <p className="eyebrow text-ink/70">Bureau of Approximate Skies · Wire Service</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-ink">Weatherwire</h2>
        </div>
        <span className="sticker -rotate-2 bg-neon-cyan text-ink">Parody</span>
      </header>

      <div className="mt-5 divide-y-2 divide-ink/10 border-y-2 border-ink/10">
        {newsFeeds.map((item, i) => (
          <article
            key={`${item.time}-${i}`}
            className="flex items-baseline gap-4 py-3"
          >
            <time className="shrink-0 font-mono text-sm font-bold tabular-nums text-ink/50">
              {item.time}
            </time>
            <p className="text-sm font-semibold leading-snug text-ink">
              {item.headline}
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-auto pt-4">
        <div className="border-t-2 border-ink/15" />
        <p className="pt-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-ink/60">
          All items filed, none confirmed
        </p>
      </footer>
    </section>
  );
}