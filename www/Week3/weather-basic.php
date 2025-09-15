<?php
// weather-basic.php
declare(strict_types=1);

/**
 * Simple server-side HTTP request in PHP using cURL.
 * Fetch current weather and render to HTML.
 */

function h(string $s): string { 
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); 
}

// Example coordinates: Halifax, NS (adjust as needed)
$lat = 44.65;
$lon = -63.57;

// Open-Meteo: No API key required. Request current weather.
$providerUrl = sprintf(
    'https://api.open-meteo.com/v1/forecast?latitude=%F&longitude=%F&current_weather=true&timezone=auto',
    $lat,
    $lon
);

// ---- cURL request ----
$ch = curl_init($providerUrl);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
]);

$body = curl_exec($ch);
$curlErr = curl_error($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// ---- Basic error handling ----
if ($curlErr || $httpCode >= 400 || $body === false) {
    http_response_code(502);
    echo "<h1>Weather temporarily unavailable</h1>";
    echo "<p>Error: " . h($curlErr ?: "HTTP $httpCode") . "</p>";
    exit;
}

$data = json_decode($body, true);
if (!is_array($data) || !isset($data['current_weather'])) {
    http_response_code(502);
    echo "<h1>Weather temporarily unavailable</h1>";
    echo "<p>Unexpected response format.</p>";
    exit;
}

$current = $data['current_weather'];

// Helper: map Open-Meteo weathercode to text
function weatherCodeToText(int $code): string {
    $map = [
        0=>"Clear sky", 1=>"Mainly clear", 2=>"Partly cloudy", 3=>"Overcast",
        45=>"Fog", 48=>"Depositing rime fog",
        51=>"Light drizzle", 53=>"Moderate drizzle", 55=>"Dense drizzle",
        56=>"Light freezing drizzle", 57=>"Dense freezing drizzle",
        61=>"Slight rain", 63=>"Moderate rain", 65=>"Heavy rain",
        66=>"Light freezing rain", 67=>"Heavy freezing rain",
        71=>"Slight snow fall", 73=>"Moderate snow fall", 75=>"Heavy snow fall",
        77=>"Snow grains",
        80=>"Slight rain showers", 81=>"Moderate rain showers", 82=>"Violent rain showers",
        85=>"Slight snow showers", 86=>"Heavy snow showers",
        95=>"Thunderstorm",
        96=>"Thunderstorm with slight hail", 99=>"Thunderstorm with heavy hail",
    ];
    return $map[$code] ?? "Unknown ($code)";
}

$tempC = (float)$current['temperature'];       // °C
$windKmh = (float)$current['windspeed'];       // km/h
$code = (int)$current['weathercode'];
$desc = weatherCodeToText($code);
$time = (string)$current['time'];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Current Weather</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: .5rem; max-width: 420px; }
  </style>
</head>
<body>
  <h1>Current Weather (Server-side PHP)</h1>
  <div class="card">
    <p><strong>Location:</strong> <?= h(number_format($lat, 2)) ?>, <?= h(number_format($lon, 2)) ?></p>
    <p><strong>Observed:</strong> <?= h($time) ?></p>
    <p><strong>Temperature:</strong> <?= h(number_format($tempC, 1)) ?> °C</p>
    <p><strong>Wind:</strong> <?= h(number_format($windKmh, 1)) ?> km/h</p>
    <p><strong>Conditions:</strong> <?= h($desc) ?></p>
  </div>
  <p style="margin-top:1rem;">
    <small>Source: Open-Meteo (no API key required).</small>
  </p>
</body>
</html>
