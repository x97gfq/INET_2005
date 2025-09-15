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

$publication = $_GET["publication"];

if ($publication === null) {
    respond(400, ['error' => 'Invalid or missing publication param']);
}


$providerUrl = 'https://open.canada.ca/data/en/api/3/action/package_search?q=' . $publication;

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
    respond(502, ['error' => 'Unexpected provider response', 'provider' => 'gov canada']);
}

$normalized = [];

for ($i = 0; $i < count($raw['result']['results']); $i++) {
    $record = [
        'title' => $raw["result"]["results"][$i]["title"],
        'published' => $raw["result"]["results"][$i]["date_published"]
    ];
    array_push($normalized, $record);
}

respond(200, $normalized);
