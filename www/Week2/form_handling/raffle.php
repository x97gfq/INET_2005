<?php

if ($_SERVER["REQUEST_METHOD"] =="POST") {

    $name = $_POST["name"];

    // Database connection settings
    $host = 'lamp_db';
    $dbname = 'school_db';
    $username = 'root';
    $password = 'rootpassword'; 
    $port = 3306;

    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }    

    $stmt = $conn->prepare("INSERT INTO raffle(name) VALUES(?);");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->close();

    echo "<p>thank you, " . $name . " for submitting your name to the raffle!</p>";

    $conn->close();
}
?>