<?php
// Database connection settings
$host = 'lamp_db';
$dbname = 'People';
$username = 'peopleuser';
$password = 'peoplepassword'; 
$port = 3306;

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, $por);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//form params
$email = $_POST['email'];
$password = $_POST['password'];

//example: ') OR ('1'='1

$query = "SELECT * FROM Users WHERE (email = '$email' AND password = '$password')";

echo "<p>(query used: " . $query . ")</p>";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    echo "Login successful!";
} else {
    echo "Invalid credentials.";
}
?>