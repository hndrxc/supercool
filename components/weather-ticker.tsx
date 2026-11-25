import { tickerItems } from "@/lib/weather";

const NEON = [
  "text-[#32ff75] drop-shadow-[0_0_8px_rgba(50,255,117,0.75)]",
  "text-[#ffd60a] drop-shadow-[0_0_8px_rgba(255,214,10,0.65)]",
];

// One full pass of the sequence. Rendered twice (identical text + identical
// trailing padding) so the -50% translateX loop in .chaotic-marquee is seamless.
function TickerRun({ offset }: { offset: number }) {
  return (
    <span className="pr-12">
      {tickerItems.map((item, i) => (
        <span key={i}>
          <span
            className={`font-mono text-sm tracking-wide ${NEON[(i + offset) % 2]}`}
          >
            {item}
          </span>
          <span className="px-4 text-[#8b87c4]">•</span>
        </span>
      ))}
    </span>
  );
}

export function WeatherTicker() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t-2 border-[#32ff75] bg-[#171438]">
      {/* left LIVE bar */}
      <div className="flex flex-none items-center gap-2 border-r-2 border-[#32ff75] bg-[#100e29] px-4 py-2">
        <span className="chaotic-pulse h-2.5 w-2.5 flex-none rounded-full bg-[#32ff75] shadow-[0_0_10px_2px_rgba(50,255,177,0.9)]" />
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#32ff75]">
          LIVE
        </span>
      </div>

      {/* the endless scroll of weather nonsense */}
      <div className="relative flex-1 overflow-hidden">
        <div className="chaotic-marquee py-2">
          <TickerRun offset={0} />
          <TickerRun offset={tickerItems.length % 2} />
        </div>
      </div>
    </div>
  );
}