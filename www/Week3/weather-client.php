<?php
// weather-client.php
declare(strict_types=1);

/**
 * Server-side consumer that calls our own proxy and renders the normalized JSON.
 * If the underlying provider changes, only the proxy needs updates—not this page.
 */

function h(string $s): string { 
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); 
}

$lat = 44.65;
$lon = -63.57;
//http://localhost/Week3/weather-proxy.php?lat=44.65&lon=-63.57
$proxyUrl = sprintf('http://localhost/Week3/weather-proxy.php?lat=%F&lon=%F', $lat, $lon);

$ch = curl_init($proxyUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 6,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false, // local demo; enable true when using HTTPS
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
]);

$body = curl_exec($ch);
$err = curl_error($ch);
$http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($err || $http >= 400 || $body === false) {
    http_response_code(502);
    echo "<h1>Weather temporarily unavailable</h1>";
    echo "<p>Error calling proxy: " . h($err ?: "HTTP $http") . "</p>";
    exit;
}

$data = json_decode((string)$body, true);

if (!is_array($data) || !isset($data['current'])) {
    http_response_code(502);
    echo "<h1>Weather temporarily unavailable</h1>";
    echo "<p>Unexpected proxy response.</p>";
    exit;
}

$cur = $data['current'];
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Weather via Our Proxy</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: .5rem; max-width: 420px; }
  </style>
</head>
<body>
  <h1>Weather (Decoupled via Proxy)</h1>
  <div class="card">
    <p><strong>Requested:</strong> <?= h(json_encode($data['requested'])) ?></p>
    <p><strong>Observed:</strong> <?= h((string)$cur['observed_at']) ?></p>
    <p><strong>Temperature:</strong> <?= h(number_format((float)$cur['temp_c'], 1)) ?> °C</p>
    <p><strong>Wind:</strong> <?= h(number_format((float)$cur['wind_kph'], 1)) ?> km/h</p>
    <p><strong>Condition (code):</strong> <?= h((string)$cur['condition']) ?></p>
    <p><small>Provider (hidden behind proxy): <?= h((string)$data['provider']) ?></small></p>
  </div>
</body>
</html>
