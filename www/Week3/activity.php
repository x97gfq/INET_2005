<?php
// activity.php
declare(strict_types=1);

/**
 * A PHP proxy (mini-API) that:
 *  - Calls an API
 *  - Normalizes the JSON to a stable shape (decouples client from provider)
 *  - Returns JSON with proper content-type and status codes
 */

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

$tvshow = $_GET["tvshow"];


if ($tvshow === null) {
    respond(400, ['error' => 'Invalid or missing tvshow param']);
}


$providerUrl = 'https://api.tvmaze.com/search/shows?q=' . $tvshow;

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
        'error'    => 'Upstream service unavailable',
        'details'  => $curlErr ?: "HTTP $httpCode",
        'provider' => 'tvmaze'
    ]);
}

$raw = json_decode((string)$body, true);

if (!is_array($raw)) {
    respond(502, ['error' => 'Unexpected provider response', 'provider' => 'open-meteo']);
}

$normalized = [];

for ($i = 0; $i < count($raw); $i++) {
    $record = [
        'name' => $raw[$i]["show"]["name"],
        'premiered' => $raw[$i]["show"]["premiered"],
        'network' => $raw[$i]["show"]["network"]["name"],
        'country' => $raw[$i]["show"]["network"]["country"]["name"]
    ];
    //array_push($normalized, "{ 'name': " . $raw[$i]["show"]["name"] . "}'");
    array_push($normalized, $record);
}

respond(200, $normalized);
