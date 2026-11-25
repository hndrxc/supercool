import type { ForecastLocation } from "./forecast-location";

export type WeatherCondition = { label: string; icon: string };

export type CurrentWeather = {
  temperatureC: number;
  apparentTemperatureC: number;
  humidityPercent: number;
  windKmh: number;
  windDirectionDegrees: number;
  pressureHpa: number;
  condition: WeatherCondition;
  time: string;
};

export type HourlyWeather = {
  time: string;
  temperatureC: number;
  condition: WeatherCondition;
};

export type LiveWeather = {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  timezone: string;
};

/** WMO codes in the Open-Meteo forecast response. */
const WMO_CONDITIONS: Readonly<Record<number, WeatherCondition>> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Moderate drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌦️" },
  56: { label: "Light freezing drizzle", icon: "🧊" },
  57: { label: "Dense freezing drizzle", icon: "🧊" },
  61: { label: "Slight rain", icon: "🌧️" },
  63: { label: "Moderate rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  66: { label: "Light freezing rain", icon: "🧊" },
  67: { label: "Heavy freezing rain", icon: "🧊" },
  71: { label: "Slight snowfall", icon: "🌨️" },
  73: { label: "Moderate snowfall", icon: "🌨️" },
  75: { label: "Heavy snowfall", icon: "🌨️" },
  77: { label: "Snow grains", icon: "❄️" },
  80: { label: "Slight rain showers", icon: "🌧️" },
  81: { label: "Moderate rain showers", icon: "🌧️" },
  82: { label: "Violent rain showers", icon: "🌧️" },
  85: { label: "Slight snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "🌨️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with slight hail", icon: "⛈️" },
  99: { label: "Thunderstorm with heavy hail", icon: "⛈️" },
};

const UNKNOWN_CONDITION: WeatherCondition = { label: "Unknown", icon: "❔" };

function conditionForWeatherCode(code: number): WeatherCondition {
  return WMO_CONDITIONS[code] ?? UNKNOWN_CONDITION;
}

function finiteNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Open-Meteo: ${field} is missing or not a finite number`);
  }
  return value;
}

function localTime(value: unknown, field: string): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    throw new Error(`Open-Meteo: ${field} is not a local timestamp`);
  }
  return value;
}

function nonEmptyArray(value: unknown, field: string): unknown[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Open-Meteo: ${field} is missing or empty`);
  }
  return value;
}

/**
 * Live weather from Open-Meteo (https://open-meteo.com/en/docs).
 * Server fetch with a short timeout and a ~10 minute Next revalidate cache.
 * Throws when the provider is unavailable or the payload is not fully numeric.
 */
export async function getLiveWeather(
  location: Pick<ForecastLocation, "latitude" | "longitude">,
): Promise<LiveWeather> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
    // 9 forecast hours: the in-progress hour is included and excluded below,
    // leaving the next 8 whole hours.
    forecast_hours: "9",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 600 },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(
      `Open-Meteo: HTTP ${response.status} fetching forecast for ${location.latitude},${location.longitude}`,
    );
  }

  const payload: unknown = await response.json();
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Open-Meteo: response body is not a JSON object");
  }
  const data = payload as Record<string, unknown>;
  const timezone = data.timezone;
  if (typeof timezone !== "string" || !timezone) {
    throw new Error("Open-Meteo: timezone is missing");
  }

  const rawCurrent = data.current;
  if (typeof rawCurrent !== "object" || rawCurrent === null) {
    throw new Error("Open-Meteo: current block is missing");
  }
  const current = rawCurrent as Record<string, unknown>;

  const time = localTime(current.time, "current.time");
  const temperatureC = finiteNumber(current.temperature_2m, "current.temperature_2m");
  const apparentTemperatureC = finiteNumber(current.apparent_temperature, "current.apparent_temperature");
  const humidityPercent = finiteNumber(current.relative_humidity_2m, "current.relative_humidity_2m");
  const windKmh = finiteNumber(current.wind_speed_10m, "current.wind_speed_10m");
  const windDirectionDegrees = finiteNumber(current.wind_direction_10m, "current.wind_direction_10m");
  const pressureHpa = finiteNumber(current.pressure_msl, "current.pressure_msl");
  const condition = conditionForWeatherCode(
    finiteNumber(current.weather_code, "current.weather_code"),
  );

  const rawHourly = data.hourly;
  if (typeof rawHourly !== "object" || rawHourly === null) {
    throw new Error("Open-Meteo: hourly block is missing");
  }
  const hourlyBlock = rawHourly as Record<string, unknown>;

  const times = nonEmptyArray(hourlyBlock.time, "hourly.time");
  const temperatures = nonEmptyArray(hourlyBlock.temperature_2m, "hourly.temperature_2m");
  const weatherCodes = nonEmptyArray(hourlyBlock.weather_code, "hourly.weather_code");

  if (times.length !== temperatures.length || times.length !== weatherCodes.length) {
    throw new Error("Open-Meteo: hourly arrays have mismatched lengths");
  }

  // Hourly timestamps are ascending local ISO strings in one timezone, so a
  // lexicographic cut at the current observation time is a valid wall-clock
  // comparison and avoids parsing into the server's timezone. The in-progress
  // hour (timestamp <= now) is dropped; the next 8 whole hours are returned.
  const nextHours: HourlyWeather[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < times.length && nextHours.length < 8; i++) {
    const hourTime = localTime(times[i], `hourly.time[${i}]`);
    if (hourTime <= time || seen.has(hourTime)) {
      continue;
    }
    seen.add(hourTime);
    nextHours.push({
      time: hourTime,
      temperatureC: finiteNumber(temperatures[i], `hourly.temperature_2m[${i}]`),
      condition: conditionForWeatherCode(
        finiteNumber(weatherCodes[i], `hourly.weather_code[${i}]`),
      ),
    });
  }

  return {
    current: {
      temperatureC,
      apparentTemperatureC,
      humidityPercent,
      windKmh,
      windDirectionDegrees,
      pressureHpa,
      condition,
      time,
    },
    hourly: nextHours,
    timezone,
  };
}
