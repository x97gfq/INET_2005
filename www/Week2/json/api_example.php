<?php
header('Content-Type: application/json');

// Database connection settings
$host = 'lamp_db';
$dbname = 'school_db';
$username = 'user';
$password = 'userpassword'; 
$port = 3306;

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, $por);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Query the students table
$sql = "SELECT first_name, last_name, email, city, program, gpa, enrolled_date FROM students";
$result = $conn->query($sql);

$students = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
} else {
    echo json_encode([]);
}

$conn->close();
?>
