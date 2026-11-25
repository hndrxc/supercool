export type CurrentConditions = {
  temperatureC: number;
  modifier: string;
  condition: string;
  windKmh: number;
  windDirection: string;
  humidity: number;
  stormDiameterM: number;
  uvIndex: string;
  feelsLike: string;
};

export type ForecastDay = {
  day: string;
  date: string;
  condition: string;
  tempC: number;
  abstraction: string;
};

export type Mascot = { name: string; signature: string };

export type NewsHeadline = { time: string; headline: string };

export type BarometerStatus = { min: number; label: string; note: string };

export const current: CurrentConditions = {
  temperatureC: 23.4,
  modifier: "officially",
  condition: "Partly Soggy",
  windKmh: 37,
  windDirection: "Northeastward, but emotionally southeast",
  humidity: 412,
  stormDiameterM: 3000,
  uvIndex: "Slightly Dangerous",
  feelsLike: "a rug that walks",
};

export const forecast: ForecastDay[] = [
  { day: "Today", date: "27/11", condition: "Umbrella Optional", tempC: 24, abstraction: "14% precipitation, 86% regret" },
  { day: "Tomorrow", date: "28/11", condition: "Slightly Raining", tempC: 19, abstraction: "Clouds at eye level" },
  { day: "Wednesday", date: "29/11", condition: "Mildly Violent Wind", tempC: 15, abstraction: "Bring a small tree" },
  { day: "Thursday", date: "30/11", condition: "40% of a Sun", tempC: 21, abstraction: "The sun is shy" },
  { day: "Friday", date: "01/12", condition: "Thunder, Probably", tempC: 17, abstraction: "Loud clouds" },
  { day: "Saturday", date: "02/12", condition: "Snow? No.", tempC: 12, abstraction: "Do not buy a sled" },
  { day: "Sunday", date: "03/12", condition: "Wet", tempC: 20, abstraction: "It will definitely rain (do not laugh)" },
];

export const tickerItems: string[] = [
  "SUNBEAMS ▲ 4.2% — supply remains emotional",
  "RAIN (PRE-ADVERTISED) ▼ 1.8% — analysts see more tears",
  "TORNADO FUND ▲ 11.0% — portfolio gently funnel-shaped",
  "CLOUD OIL flat — the sky refuses to comment",
  "BREEZE FUTURES ▲ 2.7% — northerly, then regrettable",
  "SUNSHINE TRUSTED ▲ 0.4%",
  "FLOOD INSURANCE ▲ 33.3% — everyone is looking out windows",
  "HAIL RAIN ★ 0.0% — weather does not pause",
  "FOG INDEX ▼ 9.1% — visibility returning to 'vague'",
  "SNOW PREVIEW — listed but untradeable, again",
  "MORNING FROST ▲ 6.6% — grass will file a complaint",
  "SKY COMMODITY ▲ 2.2% — blue futures steady, slightly dramatic",
];

export const alerts: string[] = [
  "SKY WATCH: clouds acting suspicious",
  "RAIN ADVISORY: please use umbrella, politely",
  "CLOUD SURGE WARNING: look outside responsibly",
];

export const mascots: Mascot[] = [
  { name: "Puff", signature: "cloud with a diploma" },
  { name: "Gust", signature: "the polite tornado" },
  { name: "Drizzle", signature: "certified drizzler, level 4" },
  { name: "Hailo", signature: "a hailstone with a hard-on for drama" },
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
];

export const barometerStatus: BarometerStatus[] = [
  { min: 900, label: "SERENELY DRAMATIC", note: "the calm before the theatrics" },
  { min: 850, label: "THEATRICAL", note: "clouds are rehearsing" },
  { min: 800, label: "SPECTACULAR", note: "bring a small audience" },
  { min: 750, label: "CHAOTICALLY BEAUTIFUL", note: "the sky is a one-man band" },
  { min: 0, label: "OFFICIALLY ABSURD", note: "do not question the needle" },
];

export function barometerStatusFor(meter: number): BarometerStatus {
  return barometerStatus.find((status) => meter >= status.min) ?? barometerStatus[barometerStatus.length - 1];
}