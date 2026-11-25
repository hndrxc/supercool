import type { CSSProperties, ReactNode } from "react";

type DebrisPath = "fling" | "arc" | "zigzag" | "boomerang" | "drift" | "spiral";
type DebrisInner = "spin" | "wobble" | "glow";

interface DebrisItem {
  node: ReactNode;
  path: DebrisPath;
  /** Seconds for one full trip; divided by --chaos in CSS. */
  d: number;
  /** Negative stagger so the screen is already populated on first frame. */
  delay: number;
  /** Font size in px (emoji / svg / css shape scale off this). */
  size: number;
  opacity: number;
  inner?: DebrisInner;
  /** Seconds per inner cycle; divided by --chaos in CSS. */
  innerD?: number;
}

const BOLT = (
  <svg className="debris-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" />
  </svg>
);

const STAR = (
  <svg className="debris-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 21.9l1.6-7L2 9.2l7.1-.6z" />
  </svg>
);

const RING = <span className="debris-ring" />;

/* Large, slow, translucent shapes float behind the page content. */
const BACK_ITEMS: DebrisItem[] = [
  { node: "☀️", path: "drift", d: 40, delay: -37, size: 160, opacity: 0.35, inner: "spin", innerD: 18 },
  { node: "🌈", path: "drift", d: 46, delay: -12, size: 170, opacity: 0.3, inner: "glow", innerD: 6 },
  { node: "☁️", path: "drift", d: 38, delay: -5, size: 120, opacity: 0.25 },
  { node: "⛈️", path: "drift", d: 44, delay: -20, size: 110, opacity: 0.3 },
  { node: "🌪️", path: "spiral", d: 14, delay: -9, size: 130, opacity: 0.35, inner: "spin", innerD: 0.35 },
  { node: "🐄", path: "drift", d: 36, delay: -28, size: 150, opacity: 0.3 },
  { node: "🏠", path: "drift", d: 52, delay: -40, size: 160, opacity: 0.28 },
  { node: "📡", path: "drift", d: 42, delay: -33, size: 120, opacity: 0.3 },
  { node: "🧦", path: "drift", d: 34, delay: -15, size: 110, opacity: 0.32 },
  { node: "🚽", path: "drift", d: 48, delay: -22, size: 130, opacity: 0.3 },
  { node: "🌭", path: "drift", d: 30, delay: -3, size: 100, opacity: 0.35 },
  { node: "🐟", path: "drift", d: 40, delay: -45, size: 140, opacity: 0.3 },
  { node: "🦆", path: "drift", d: 38, delay: -18, size: 130, opacity: 0.32 },
  { node: "🪑", path: "drift", d: 46, delay: -8, size: 140, opacity: 0.3 },
  { node: BOLT, path: "drift", d: 36, delay: -26, size: 120, opacity: 0.4, inner: "wobble", innerD: 4 },
  { node: "💨", path: "drift", d: 32, delay: -11, size: 140, opacity: 0.35 },
];

/* Small-to-medium, slightly translucent junk zips over the panels (under the ticker). */
const FRONT_ITEMS: DebrisItem[] = [
  { node: "☁️", path: "fling", d: 7, delay: -2, size: 40, opacity: 0.7 },
  { node: "⛈️", path: "fling", d: 9, delay: -5, size: 44, opacity: 0.7 },
  { node: "🌪️", path: "fling", d: 8, delay: -1, size: 42, opacity: 0.75 },
  { node: "🌈", path: "arc", d: 11, delay: -7, size: 48, opacity: 0.65 },
  { node: "☀️", path: "arc", d: 10, delay: -3, size: 40, opacity: 0.75 },
  { node: "❄️", path: "zigzag", d: 6, delay: -4, size: 26, opacity: 0.8 },
  { node: "☂️", path: "zigzag", d: 8, delay: -6, size: 34, opacity: 0.75 },
  { node: "⚡", path: "fling", d: 5, delay: -2, size: 32, opacity: 0.8 },
  { node: "🌡️", path: "arc", d: 12, delay: -9, size: 30, opacity: 0.8 },
  { node: "💨", path: "fling", d: 6, delay: -8, size: 36, opacity: 0.7 },
  { node: "🐟", path: "boomerang", d: 9, delay: -3, size: 30, opacity: 0.75 },
  { node: "🦆", path: "boomerang", d: 10, delay: -6, size: 34, opacity: 0.75 },
  { node: "🧦", path: "zigzag", d: 7, delay: -5, size: 28, opacity: 0.8 },
  { node: "🚽", path: "fling", d: 13, delay: -10, size: 50, opacity: 0.55 },
  { node: "🌭", path: "boomerang", d: 8, delay: -1, size: 34, opacity: 0.8 },
  { node: "⚽", path: "arc", d: 9, delay: -4, size: 30, opacity: 0.75 },
  { node: "🎈", path: "fling", d: 7, delay: -9, size: 28, opacity: 0.8 },
  { node: "💣", path: "fling", d: 10, delay: -7, size: 32, opacity: 0.7 },
  { node: STAR, path: "zigzag", d: 5, delay: -2, size: 24, opacity: 0.85, inner: "wobble", innerD: 2.5 },
  { node: RING, path: "arc", d: 11, delay: -12, size: 36, opacity: 0.6, inner: "spin", innerD: 1.6 },
];

function DebrisItem({ item }: { item: DebrisItem }) {
  const style = {
    "--d": `${item.d}s`,
    "--delay": `${item.delay}s`,
    "--size": `${item.size}px`,
    "--opacity": item.opacity,
  } as CSSProperties;

  if (item.inner) {
    return (
      <span className={`debris-object debris-path-${item.path}`} style={style}>
        <span
          className={`debris-inner debris-${item.inner}`}
          style={{ "--inner-d": `${item.innerD ?? 1}s` } as CSSProperties}
        >
          {item.node}
        </span>
      </span>
    );
  }

  return (
    <span className={`debris-object debris-path-${item.path}`} style={style}>
      {item.node}
    </span>
  );
}

export function FlyingDebris() {
  return (
    <>
      <div aria-hidden="true" className="debris-layer debris-back">
        {BACK_ITEMS.map((item, i) => (
          <DebrisItem key={i} item={item} />
        ))}
      </div>
      <div aria-hidden="true" className="debris-layer debris-front">
        {FRONT_ITEMS.map((item, i) => (
          <DebrisItem key={i} item={item} />
        ))}
      </div>
    </>
  );
}
