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

//get email and pwd
$email = $_POST['email'];
$password = $_POST['password'];

//retrieve the password hash
$query = "SELECT password FROM Users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($hash);
$stmt->fetch();

//hash the password and compare it ot the stored hash
if (password_verify($password, $hash)) {
    echo "Login successful!";
} else {
    echo "Invalid credentials.";
}
?>