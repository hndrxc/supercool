export type Mascot = { name: string; signature: string };

export type NewsHeadline = { time: string; headline: string };

export type Alert = { title: string; body: string };

export const tickerItems: string[] = [
  "SUNBEAMS ▲ 4.2% — supply remains emotional",
  "RAIN (PRE-ADVERTISED) ▼ 1.8% — analysts see more tears",
  "TORNADO FUND ▲ 11.0% — portfolio gently funnel-shaped",
  "CLOUD OIL ▼ 0.0% — the sky refuses to comment",
  "BREEZE FUTURES ▲ 2.7% — northerly, then regrettable",
  "SUNSHINE TRUST ▲ 0.4% — dividend paid in glare",
  "FLOOD INSURANCE ▲ 33.3% — everyone is looking out windows",
  "HAIL RAIN ▼ 0.0% — settlement postponed indefinitely",
  "FOG INDEX ▼ 9.1% — visibility returning to 'vague'",
  "SNOW PREVIEW ▼ 0.0% — listed but untradeable, again",
  "MORNING FROST ▲ 6.6% — grass will file a complaint",
  "SKY COMMODITY ▲ 2.2% — blue futures steady, slightly dramatic",
];

export const alerts: Alert[] = [
  { title: "Sky Watch", body: "Clouds are gathering in groups of three or more. Maintain polite distance." },
  { title: "Rain Advisory", body: "Hydrometeors may fall from a great height. Umbrellas remain voluntary." },
  { title: "Cloud Surge Warning", body: "A surge of cumulus is inbound for the afternoon. Look outside responsibly." },
];

export const mascots: Mascot[] = [
  { name: "Puff", signature: "cloud with a diploma" },
  { name: "Gust", signature: "the polite tornado" },
  { name: "Drizzle", signature: "certified drizzler, level 4" },
  { name: "Hailo", signature: "a hailstone committed to the craft of drama" },
  { name: "Biff", signature: "the 37 km/h gust, mildly offended" },
  { name: "Mist", signature: "forever a little foggy about it" },
  { name: "Stevie", signature: "a raindrop with a plan" },
  { name: "Boris", signature: "the cumulonimbus, union rep" },
  { name: "Twiggy", signature: "the branch that always falls" },
  { name: "Dot", signature: "the period at the end of 'it might rain'" },
];

export const newsFeeds: NewsHeadline[] = [
  { time: "05:12", headline: "Cloud moves west, brings paperwork" },
  { time: "08:47", headline: "Umbrella sales up 300% after 14% chance of sadness" },
  { time: "11:03", headline: "Local man outruns small tornado; tornado files grievance" },
  { time: "13:58", headline: "Forecasters insist the forecast has never felt this confident" },
  { time: "16:21", headline: "Sun appears, then immediately regrets it" },
  { time: "18:45", headline: "Committee votes to keep the sky blue; vote held in private" },
];
