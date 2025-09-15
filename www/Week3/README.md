# INET 2005 — Server-side HTTP in PHP (Weather + Proxy Pattern)

This package contains ready-to-run examples showing how to make server-side HTTP requests in PHP with cURL, render data, and decouple your pages from third-party APIs using a **proxy** that normalizes JSON.

## Files

- `weather-basic.php` — Direct call to Open‑Meteo and HTML rendering.
- `weather-proxy.php` — PHP proxy that fetches weather and returns **normalized** JSON.
- `weather-client.php` — Server-side page that calls the proxy and renders normalized data.

## Prerequisites

- PHP 8.x with cURL enabled (`php -m | grep curl`).
- Internet connection.

## Run (local demo)

```bash
php -S localhost:8000
```

Then open:
- http://localhost:8000/weather-basic.php
- http://localhost:8000/weather-client.php  (which calls `weather-proxy.php`)

## In-class Activity (Retrofit Provider)

Update only `weather-proxy.php` to use a different API but keep the **same** normalized schema:

```json
{
  "provider": "your-provider",
  "requested": { "lat": <num>, "lon": <num> },
  "current": {
    "temp_c": <num>,
    "wind_kph": <num>,
    "condition": <string|int>,
    "observed_at": "<ISO8601>"
  },
  "retrieved_at": "<ISO8601>"
}
```

### API ideas

- **OpenWeatherMap** (key): `https://api.openweathermap.org/data/2.5/weather?lat=44.65&lon=-63.57&units=metric&appid=YOUR_KEY`
- **Weather.gov (US only)**: `https://api.weather.gov/points/38.8977,-77.0365/forecast`
- **TVMaze** (no key): `https://api.tvmaze.com/search/shows?q=office`
- **OMDb** (key): `http://www.omdbapi.com/?t=Inception&apikey=YOUR_KEY`
- **TMDB** (key): `https://api.themoviedb.org/3/search/movie?query=inception&api_key=YOUR_KEY`
- **iTunes Search** (no key): `https://itunes.apple.com/search?term=taylor+swift&media=music`
- **PokeAPI**: `https://pokeapi.co/api/v2/pokemon/pikachu`

> For APIs that require keys, store them in environment variables or a non-web-readable config.

## Optional: Simple File Cache (Proxy)

Add this snippet to `weather-proxy.php` before making the cURL request, and save after building `$normalized`:

```php
$cacheKey = sprintf('%0.2f_%0.2f', $lat, $lon);
$cacheFile = __DIR__ . "/cache_$cacheKey.json";
$ttl = 60; // seconds
if (is_file($cacheFile) && (time() - filemtime($cacheFile) < $ttl)) {
    $cached = json_decode(file_get_contents($cacheFile), true);
    if (is_array($cached)) {
        respond(200, $cached);
    }
}

// After building $normalized
@file_put_contents($cacheFile, json_encode($normalized));
```

## Best Practices

- Validate inputs (`lat`, `lon`).
- Set timeouts and handle HTTP errors.
- Normalize data (consistent field names and units).
- Escape output when rendering HTML.
- Keep API keys server-side; never expose them to the browser.

## License

Educational use for INET 2005.
