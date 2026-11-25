import type { CSSProperties, ReactNode } from "react";
import Form from "next/form";
import Link from "next/link";
import { Suspense } from "react";
import { BigBang } from "@/components/big-bang";
import { FlyingDebris } from "@/components/flying-debris";
import { VoidPrompt } from "@/components/void-prompt";
import { MascotHeader } from "@/components/mascot-header";
import { CurrentConditionsPanel } from "@/components/current-conditions-panel";
import { HourlyForecastStrip } from "@/components/hourly-forecast-strip";
import { WeatherTicker } from "@/components/weather-ticker";
import { ForecastMap } from "@/components/forecast-map";
import { BarometerGauge } from "@/components/barometer-gauge";
import { MascotCarousel } from "@/components/mascot-carousel";
import { WeatherNewsFeed } from "@/components/weather-news-feed";
import { StormRadar } from "@/components/storm-radar";
import { ChaosControls } from "@/components/chaos-controls";
import { WarningsBoard } from "@/components/warnings-board";
import { FooterCertifications } from "@/components/footer-certifications";
import { resolveDisplacedLocation, type DisplacedLocation } from "@/lib/forecast-location";
import { getLiveWeather, type LiveWeather } from "@/lib/live-weather";

const MAX_QUERY_LENGTH = 80;

type ChaosStyle = CSSProperties & Record<`--${string}`, string>;

/** Where each panel is flung in from as the blast opens, in render order. */
const SHRAPNEL: ChaosStyle[] = [
  { "--from-x": "-120vw", "--from-y": "-40vh", "--from-rot": "-60deg", animationDelay: "0.35s" },
  { "--from-x": "120vw", "--from-y": "-70vh", "--from-rot": "75deg", animationDelay: "0.45s" },
  { "--from-x": "-30vw", "--from-y": "120vh", "--from-rot": "-120deg", animationDelay: "0.55s" },
  { "--from-x": "90vw", "--from-y": "90vh", "--from-rot": "200deg", animationDelay: "0.6s" },
  { "--from-x": "-140vw", "--from-y": "60vh", "--from-rot": "-15deg", animationDelay: "0.7s" },
  { "--from-x": "40vw", "--from-y": "-130vh", "--from-rot": "95deg", animationDelay: "0.8s" },
  { "--from-x": "130vw", "--from-y": "20vh", "--from-rot": "-160deg", animationDelay: "0.85s" },
  { "--from-x": "-80vw", "--from-y": "-110vh", "--from-rot": "45deg", animationDelay: "0.95s" },
  { "--from-x": "10vw", "--from-y": "140vh", "--from-rot": "-270deg", animationDelay: "1.05s" },
  { "--from-x": "-120vw", "--from-y": "10vh", "--from-rot": "130deg", animationDelay: "1.15s" },
  { "--from-x": "110vw", "--from-y": "-20vh", "--from-rot": "-90deg", animationDelay: "1.25s" },
  { "--from-x": "-50vw", "--from-y": "130vh", "--from-rot": "300deg", animationDelay: "1.35s" },
];

/** One panel's slot in the grid; it flies in from SHRAPNEL[i] as the blast opens. */
function Shard({ i, className = "", children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <div className={`shrapnel-in min-w-0 ${className}`} style={SHRAPNEL[i]}>
      {children}
    </div>
  );
}

/** Shown while a forecast loads: the prompt has collapsed into a point. */
function Singularity() {
  return (
    <div role="status" aria-label="Loading forecast" className="grid min-h-dvh place-items-center bg-black">
      <span className="void-singularity block h-2 w-2 rounded-full bg-white" />
    </div>
  );
}

function Detonation({ location, weather }: { location: DisplacedLocation; weather?: LiveWeather }) {
  return (
    <div className="chaos-backdrop relative min-h-screen overflow-clip">
      <BigBang />
      <FlyingDebris />

      <header className="relative z-20 border-b-[3px] border-ink bg-night text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-6 py-4">
          <div className="mr-auto">
            <h1 className="chaotic-rainbow font-lobster text-4xl leading-none sm:text-5xl">WEATHER.EXE</h1>
            <p className="eyebrow mt-2 text-white/70">Real weather · wrong place · est. last Tuesday</p>
          </div>
          <Form action="/" className="flex w-full gap-2 sm:w-auto">
            <label htmlFor="forecast-query" className="sr-only">Forecast a different U.S. place or ZIP</label>
            <input
              id="forecast-query"
              name="q"
              type="search"
              required
              minLength={2}
              maxLength={MAX_QUERY_LENGTH}
              placeholder="Place or ZIP"
              className="h-11 min-w-0 flex-1 rounded-full border-2 border-white/30 bg-white/10 px-5 font-mono text-sm text-white placeholder:text-white/50 focus-visible:border-neon-cyan focus-visible:outline-none sm:w-72"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full border-2 border-ink bg-neon-lime px-5 font-mono text-sm font-bold text-ink hover:bg-neon-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
            >
              Misplace it ↪
            </button>
          </Form>
          <Link
            href="/"
            className="font-mono text-sm font-bold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan"
          >
            ↺ Back to the void
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-10 pb-16">
        <section aria-label="Real weather at the wrong place" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          <Shard i={0} className="md:col-span-2 lg:col-span-8">
            <div className="panel @container flex h-full flex-col gap-6 bg-neon-lime p-5 text-ink sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="eyebrow">Forecast receipt · Bureau of Approximate Skies</p>
                <span className="sticker rotate-2 bg-white text-ink">{Math.round(location.distanceMiles)} mi off target</span>
              </div>
              <div className="my-auto grid gap-4 @xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)] @xl:items-end">
                <div className="min-w-0">
                  <p className="eyebrow text-ink/60">You asked for</p>
                  <p className="mt-1 text-2xl font-bold wrap-break-word line-through decoration-neon-pink decoration-4">
                    {location.requested.label}
                  </p>
                </div>
                <span aria-hidden className="hidden pb-1 font-mono text-4xl font-bold @xl:block">→</span>
                <div className="min-w-0">
                  <p className="eyebrow text-ink/60">You’re getting</p>
                  <h2 className="mt-1 font-lobster text-4xl leading-tight wrap-break-word @xl:text-5xl">{location.actual.label}</h2>
                </div>
              </div>
              <p className="mt-auto border-t-2 border-ink/15 pt-4 text-sm">
                Live conditions from a real place, just not the one you typed. No refunds on rain.
              </p>
            </div>
          </Shard>
          <Shard i={1} className="md:col-span-1 lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <MascotHeader />
          </Shard>
          {weather ? (
            <>
              <Shard i={2} className="md:col-span-2 lg:col-span-7">
                <CurrentConditionsPanel current={weather.current} />
              </Shard>
              <Shard i={3} className="md:col-span-1 lg:col-span-5">
                <BarometerGauge pressureHpa={weather.current.pressureHpa} />
              </Shard>
              <Shard i={4} className="md:col-span-2 lg:col-span-12">
                <HourlyForecastStrip hourly={weather.hourly} timezone={weather.timezone} />
              </Shard>
            </>
          ) : (
            <p role="status" className="panel bg-paper p-6 font-mono text-sm text-ink md:col-span-2 lg:col-span-12">
              The weather wire is down. No live readings right now; try again in a moment.
            </p>
          )}
        </section>

        <Shard i={11} className="mt-16 mb-6">
          <div className="panel flex flex-wrap items-end justify-between gap-4 bg-ink p-5 text-white sm:p-6">
            <div>
              <p className="eyebrow text-neon-lime">Above: real weather · Below: none of it is real</p>
              <h2 id="parody-desk" className="mt-1 font-lobster text-4xl leading-tight">The Parody Desk</h2>
            </div>
            <p className="max-w-md text-sm text-white/80">
              Maps, radar, warnings, and news filed by the Department of Mild Concern. For real alerts, use{" "}
              <a href="https://www.weather.gov/" className="font-bold text-neon-cyan underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-neon-cyan">weather.gov</a>.
            </p>
          </div>
        </Shard>

        <section aria-labelledby="parody-desk" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          <Shard i={5} className="md:col-span-2 lg:col-span-7">
            <ForecastMap />
          </Shard>
          <Shard i={6} className="md:col-span-1 lg:col-span-5">
            <StormRadar />
          </Shard>
          <Shard i={7} className="md:col-span-1 lg:col-span-5">
            <WeatherNewsFeed />
          </Shard>
          <Shard i={8} className="md:col-span-1 lg:col-span-4">
            <WarningsBoard />
          </Shard>
          <Shard i={9} className="md:col-span-1 lg:col-span-3">
            <MascotCarousel />
          </Shard>
          <Shard i={10} className="md:col-span-2 lg:col-span-12">
            <ChaosControls />
          </Shard>
        </section>
      </main>

      <WeatherTicker />
      <FooterCertifications />
    </div>
  );
}

async function WeatherExperience({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { q } = await searchParams;
  if (q === undefined) return <VoidPrompt maxLength={MAX_QUERY_LENGTH} />;

  const query = typeof q === "string" ? q.trim() : "";
  if (query.length < 2 || query.length > MAX_QUERY_LENGTH) {
    return <VoidPrompt maxLength={MAX_QUERY_LENGTH} query={query} error="Type a U.S. place or ZIP code." />;
  }

  let location: DisplacedLocation | null;
  try {
    location = await resolveDisplacedLocation(query);
  } catch {
    return <VoidPrompt maxLength={MAX_QUERY_LENGTH} query={query} error="The location desk is offline. Try again in a moment." />;
  }
  if (!location) {
    return <VoidPrompt maxLength={MAX_QUERY_LENGTH} query={query} error="No U.S. match. Try a ZIP or a place like Baltimore, MD." />;
  }

  let weather: LiveWeather | undefined;
  try {
    weather = await getLiveWeather(location.actual);
  } catch {
    // Still detonate: the relocation is shown with a weather-outage notice.
  }

  // Keyed by query so every new search replays the explosion.
  return <Detonation key={query} location={location} weather={weather} />;
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <Suspense fallback={<Singularity />}>
      <WeatherExperience searchParams={searchParams} />
    </Suspense>
  );
}
