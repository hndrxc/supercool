import { newsFeeds } from "@/lib/weather";

const rowStyles = [
  "bg-yellow-200 -translate-x-1.5 -rotate-1",
  "bg-pink-200 translate-x-1.5 rotate-1",
  "bg-white -translate-x-1 rotate-2",
];

export function WeatherNewsFeed() {
  return (
    <section className="relative -rotate-[1.5deg] bg-white p-0">
      <div className="m-1.5 border-2 border-dashed border-black p-3">
        <header className="mb-3 flex items-center justify-between gap-2 border-b-4 border-double border-black pb-2">
          <h2 className="font-lobster text-3xl leading-none text-[#ff2d95] drop-shadow-[2px_2px_0_#000]">
            WEATHERWIRE
          </h2>
          <span
            className="chaotic-flicker inline-block -rotate-6 border-2 border-black bg-red-600 px-2 py-0.5 font-mono text-xs font-black uppercase tracking-widest text-white"
            >
            BREAKING
          </span>
        </header>

        <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-black">
          breaking: it might rain
        </p>

        <div className="space-y-2">
          {newsFeeds.map((item, i) => (
            <article
              key={`${item.time}-${i}`}
              className={`${rowStyles[i % rowStyles.length]} flex items-start gap-2 border-2 border-black p-2 shadow-[4px_4px_0_0_#000]`}
            >
              <time className="shrink-0 bg-black px-1.5 py-0.5 font-mono text-[10px] font-black uppercase text-lime-400">
                {item.time}
              </time>
              <p className="font-roboto text-sm font-bold leading-snug text-black">
                {item.headline}
              </p>
            </article>
          ))}

          <article className="flex items-start gap-2 border-2 border-double border-black bg-lime-300 p-2 shadow-[4px_4px_0_0_#ff2d95] -rotate-2 translate-x-1.5">
            <time className="shrink-0 bg-black px-1.5 py-0.5 font-mono text-[10px] font-black uppercase text-yellow-300">
              11:00
            </time>
            <p className="font-roboto text-sm font-bold leading-snug text-black">
              EXCLUSIVE: cloud denies leaking (more at 11:00)
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}