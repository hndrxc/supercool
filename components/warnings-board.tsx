import { alerts } from "@/lib/weather";

const PIN_TILTS = ["rotate-3", "-rotate-2", "rotate-2"];

export function WarningsBoard() {
  return (
    <section className="panel flex h-full flex-col bg-paper p-5 sm:p-6 @container">
      {/* header */}
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <p className="eyebrow text-ink/70">Bureau of Approximate Skies</p>
          <h2 className="mt-1 font-lobster text-3xl leading-tight text-ink">
            Do Not Panic (Too Hard)
          </h2>
        </div>
        <span className="sticker rotate-2 bg-neon-yellow text-ink">Parody</span>
      </header>

      <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-ink/70">
        Issued by the Department of Mild Concern
      </p>

      {/* pinned memos */}
      <div className="mt-5 grid gap-5">
        {alerts.map((alert, i) => (
          <article
            key={alert.title}
            className="relative rounded-xl border-2 border-ink bg-white px-4 pb-4 pt-5 shadow-[3px_3px_0_0_var(--color-ink)]"
          >
            <span
              className={`absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-red-900 bg-red-500 shadow-[1px_2px_0_0_rgba(0,0,0,0.35)] ${PIN_TILTS[i % PIN_TILTS.length]}`}
            />
            <h3 className="flex items-center gap-2 font-mono text-sm font-black uppercase tracking-widest text-ink">
              <span className="text-neon-pink">⚠</span>
              {alert.title}
            </h3>
            <p className="mt-2 text-sm leading-snug text-ink/80">{alert.body}</p>
          </article>
        ))}

        {alerts.length === 0 && (
          <article className="relative rounded-xl border-2 border-ink bg-white px-4 py-6 text-center shadow-[3px_3px_0_0_var(--color-ink)]">
            <span className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-red-900 bg-red-500 shadow-[1px_2px_0_0_rgba(0,0,0,0.35)] rotate-3" />
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ink/70">
              No Warnings (suspiciously)
            </p>
          </article>
        )}
      </div>

      {/* fine print */}
      <footer className="mt-auto pt-4">
        <div className="border-t-2 border-ink/15" />
        <p className="pt-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-ink/60">
          Warnings are weather. Weather is warnings.
        </p>
      </footer>
    </section>
  );
}