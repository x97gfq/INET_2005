<?php
require 'vendor/autoload.php';
//run: composer require vlucas/phpdotenv

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['HOST'];
$db_name = $_ENV['DB_NAME'];
$db_user = $_ENV['DB_USER'];
$db_pass = $_ENV['DB_PASS'];
$port = $_ENV['PORT'];

echo "<p>DB: $db_name</p>";

// Create connection
$conn = new mysqli($host, $db_user, $db_pass, $db_name, $port);

if ($conn->connect_error) {
    die("<p>Connection failed: $conn->connect_error");
}

echo "<p>Connected to db.</p>";

?>
