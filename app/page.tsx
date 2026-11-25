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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eae8ff]">
      <header className="relative z-20 border-b-4 border-dashed border-[#171438]/40 bg-[#fff7e8]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-3 sm:py-4">
          <div>
            <h1 className="chaotic-rainbow font-lobster text-3xl leading-none sm:text-4xl lg:text-5xl">
              WEATHER.EXE
            </h1>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171438]/70 sm:text-xs">
              a fictional forecast · established last Tuesday
            </p>
          </div>
          <MascotHeader />
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2 md:items-start lg:grid-cols-12">
        <div className="min-w-0 md:col-span-1 lg:col-span-5">
          <CurrentConditionsPanel />
        </div>
        <div className="min-w-0 md:col-span-1 lg:col-span-7">
          <ForecastMap />
        </div>
        <div className="min-w-0 md:col-span-2 lg:col-span-12">
          <HourlyForecastStrip />
        </div>
        <div className="min-w-0 md:col-span-1 lg:col-span-4">
          <StormRadar />
        </div>
        <div className="min-w-0 md:col-span-1 lg:col-span-4">
          <BarometerGauge />
        </div>
        <div className="min-w-0 md:col-span-2 lg:col-span-4">
          <ChaosControls />
        </div>
        <div className="min-w-0 md:col-span-1 lg:col-span-5">
          <WarningsBoard />
        </div>
        <div className="min-w-0 md:col-span-1 lg:col-span-4">
          <WeatherNewsFeed />
        </div>
        <div className="min-w-0 md:col-span-2 lg:col-span-3">
          <MascotCarousel />
        </div>
      </main>

      <WeatherTicker />
      <FooterCertifications />
    </div>
  );
}