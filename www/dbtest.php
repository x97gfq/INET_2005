<?php
$dsn = "mysql:host=db;dbname=mydatabase;charset=utf8mb4";
$user = "";
$pass = "";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $stmt = $pdo->query("SELECT NOW() AS server_time");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "<h1>LAMP is up 🎉</h1>";
    echo "<p>MySQL time: " . htmlspecialchars($row['server_time']) . "</p>";
} catch (PDOException $e) {
    http_response_code(500);
    echo "<h1>DB connection failed</h1>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
}
?>