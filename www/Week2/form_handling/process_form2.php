<?php
// Database connection settings
$host = 'lamp_db';
$dbname = 'school_db';
$username = 'user';
$password = 'userpassword'; 
$port = 13306;

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, $por);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $bio = htmlspecialchars($_POST["bio"]);
    $gender = $_POST["gender"] ?? "Not specified";
    $interests = $_POST["interests"] ?? [];
    $country = $_POST["country"];
    $interests_str = implode(", ", $interests);
    $filename = null;

    // Handle file upload
    if (isset($_FILES["uploaded_file"]) && $_FILES["uploaded_file"]["error"] == 0) {
        $filename = basename($_FILES["uploaded_file"]["name"]);
        $target_dir = "uploads/";
        $target_file = $target_dir . $filename;

        if (!is_dir($target_dir)) {
            mkdir($target_dir);
        }

        if (!move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $target_file)) {
            $filename = null;
        }
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO form_submissions (name, bio, gender, interests, country, filename) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $bio, $gender, $interests_str, $country, $filename);
    $stmt->execute();
    $stmt->close();

    echo "<h2>Form Data Received:</h2>";
    echo "Name: $name<br>";
    echo "Bio: $bio<br>";
    echo "Gender: $gender<br>";
    echo "Interests: $interests_str<br>";
    echo "Country: $country<br>";
    echo $filename ? "File uploaded: $filename<br>" : "No file uploaded.<br>";
}

$conn->close();
?>
