# WEATHER.EXE

A Next.js and Tailwind CSS weather site that intentionally forecasts the wrong place. The home page is a single text box in a black void. Enter a U.S. place name or ZIP code and the page explodes into the full dashboard: panels fly in, debris crosses the screen, and the result names both the requested location and the real, different location used for the forecast. Unknown places return you to the void with a message.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Chaos Console adjusts animation speed; with your system's reduced-motion preference on, the explosion and flying debris are skipped.

Current conditions and hourly forecasts come from [Open-Meteo](https://open-meteo.com/) (keyless for non-commercial use). The eight-hour strip uses the forecast location’s local time. [GeoNames](https://www.geonames.org/) location data ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)) supplies the U.S. postal snapshot and underlies Open-Meteo's place search. Short-lived forecast caching avoids an upstream call on every reload.

Lookup covers the 50 states and D.C.; ZIPs must be in the geographic postal snapshot. To update it, run `node scripts/build-us-postal.mjs` (requires `unzip`). Location substitutions are deterministic, with a nearest-place fallback in remote areas.

The Sundorp map, radar, warnings, and news are parody, not live weather or safety alerts.

`npm run build` compiles, type-checks, and prerenders the production site.
