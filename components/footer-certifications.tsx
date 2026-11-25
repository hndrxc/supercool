type Seal = {
  caption: string;
  star: boolean;
  color: string;
};

const seals: Seal[] = [
  { caption: "CALIBRATED", star: true, color: "#24c6ff" },
  { caption: "INSPECTED BY CLOUDS", star: false, color: "#ff2079" },
  { caption: "92% ACCURATE*", star: true, color: "#d4ff4f" },
  { caption: "RAIN-SAFE", star: false, color: "#ffd60a" },
  { caption: "NOT LEGALLY BINDING", star: true, color: "#b455ff" },
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

const creditedLink =
  "font-bold text-neon-cyan underline underline-offset-4 decoration-2 hover:text-white " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-yellow";

export function FooterCertifications() {
  return (
    <footer className="relative border-t-4 border-neon-cyan bg-night px-6 pt-12 pb-16 text-white">
      <div className="mx-auto max-w-5xl">
        {/* refined seal row: identical badges, readable 12px captions */}
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
          {seals.map((seal) => (
            <div key={seal.caption} className="flex w-28 flex-col items-center gap-3">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 bg-night-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.45)]"
                style={{ borderColor: seal.color }}
              >
                {seal.star ? <StarIcon color={seal.color} /> : <CheckIcon color={seal.color} />}
              </div>
              <p className="text-center font-mono text-xs leading-tight tracking-wider text-white/80">
                {seal.caption}
              </p>
            </div>
          ))}
        </div>

        {/* the big legally-meaningless statement */}
        <p className="mx-auto mt-12 max-w-4xl text-center font-lobster text-3xl leading-tight sm:text-4xl">
          WEATHER.EXE is not affiliated with the weather, the sky, or the ground
        </p>

        {/* attribution + parody disclaimer */}
        <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center font-mono text-sm leading-relaxed">
          <p>
            Live readings by <a className={creditedLink} href="https://open-meteo.com/">Open-Meteo</a>{" "}
            · location geodata by <a className={creditedLink} href="https://www.geonames.org/">GeoNames</a>{" "}
            (CC BY 4.0)
          </p>
          <p>
            Radar, warnings, news, and ticker are parody — not actual emergency weather. For real alerts, see{" "}
            <a className={creditedLink} href="https://www.weather.gov/">weather.gov</a>.
          </p>
          <p className="text-white/70">© 2026 WEATHER.EXE · All forecasts are vibes.</p>
        </div>
      </div>
    </footer>
  );
}