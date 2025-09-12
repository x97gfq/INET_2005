<?php
$filename = "messages.txt";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = trim($_POST["message"]);
    if (!empty($message)) {
        file_put_contents($filename, $message . PHP_EOL, FILE_APPEND);
        echo "<p>Message saved!</p>";
    } else {
        echo "<p>Please enter a message.</p>";
    }
}

echo "<h2>Messages:</h2>";
if (file_exists($filename)) {
    $contents = file_get_contents($filename);
    echo nl2br(htmlspecialchars($contents));
} else {
    echo "No messages yet.";
}
?>
