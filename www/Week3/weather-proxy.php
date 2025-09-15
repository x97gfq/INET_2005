<?php
// weather-proxy.php
declare(strict_types=1);

/**
 * A PHP proxy (mini-API) that:
 *  - Accepts lat/lon query params (e.g., ?lat=44.65&lon=-63.57)
 *  - Calls Open-Meteo (no API key)
 *  - Normalizes the JSON to a stable shape (decouples client from provider)
 *  - Returns JSON with proper content-type and status codes
 */

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

$lat = filter_input(INPUT_GET, 'lat', FILTER_VALIDATE_FLOAT);
$lon = filter_input(INPUT_GET, 'lon', FILTER_VALIDATE_FLOAT);

if ($lat === null || $lon === null || $lat === false || $lon === false) {
    respond(400, ['error' => 'Invalid or missing lat/lon']);
}

$lat = max(-90.0, min(90.0, $lat));
$lon = max(-180.0, min(180.0, $lon));

$providerUrl = sprintf(
    'https://api.open-meteo.com/v1/forecast?latitude=%F&longitude=%F&current_weather=true&timezone=auto',
    $lat, $lon
);

// ---- cURL request ----
$ch = curl_init($providerUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION  => true,
    CURLOPT_TIMEOUT         => 8,
    CURLOPT_SSL_VERIFYPEER  => true,
    CURLOPT_HTTPHEADER      => ['Accept: application/json'],
]);
$body = curl_exec($ch);
$curlErr = curl_error($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curlErr || $httpCode >= 400 || $body === false) {
    respond(502, [
        'error'    => 'Upstream weather service unavailable',
        'details'  => $curlErr ?: "HTTP $httpCode",
        'provider' => 'open-meteo'
    ]);
}

$raw = json_decode((string)$body, true);
if (!is_array($raw) || !isset($raw['current_weather'])) {
    respond(502, ['error' => 'Unexpected provider response', 'provider' => 'open-meteo']);
}

$cur = $raw['current_weather'];

// Map provider fields to a stable, provider-agnostic schema
$normalized = [
    'provider'  => 'open-meteo',
    'requested' => ['lat' => round($lat, 4), 'lon' => round($lon, 4)],
    'current'   => [
        'temp_c'      => (float)$cur['temperature'],            // °C
        'wind_kph'    => (float)$cur['windspeed'],              // km/h
        'condition'   => (int)$cur['weathercode'],              // code; you may map to text
        'observed_at' => (string)$cur['time'],
    ],
    'retrieved_at' => gmdate('c'),
];

respond(200, $normalized);
