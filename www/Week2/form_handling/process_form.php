<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $bio = htmlspecialchars($_POST["bio"]);
    $gender = $_POST["gender"] ?? "Not specified";
    $interests = $_POST["interests"] ?? [];
    $country = $_POST["country"];

    echo "<h2>Form Data Received:</h2>";
    echo "Name: $name<br>";
    echo "Bio: $bio<br>";
    echo "Gender: $gender<br>";
    echo "Interests: " . implode(", ", $interests) . "<br>";
    echo "Country: $country<br>";

    // Handle file upload
    if (isset($_FILES["uploaded_file"]) && $_FILES["uploaded_file"]["error"] == 0) {
        $filename = basename($_FILES["uploaded_file"]["name"]);
        $target_dir = "uploads/";
        $target_file = $target_dir . $filename;

        if (!is_dir($target_dir)) {
            mkdir($target_dir);
        }

        if (move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $target_file)) {
            echo "File uploaded successfully: $filename<br>";
        } else {
            echo "Error uploading file.<br>";
        }
    } else {
        echo "No file uploaded or upload error.<br>";
    }
}
?>
