<?php

//Work in progress

$host = 'lamp_db';
$dbname = 'school_db';
$username = 'user';
$password = 'userpassword';
$port = 3306;

$conn = new mysqli($host, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die('connection failed: ' . $conn->connect_error);
}

$sql = "SELECT first_name, last_name, email, city, program, gpa
    enrolled_date FROM students";

$result = $conn->query($sql);

if ($result->num_rows > 0) {


    echo 'we got data back!';



} else {
    echo 'we have no data';
}

$conn->close();
?>