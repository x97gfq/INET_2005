<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bootstrap Page</title>
    <!-- Include Bootstrap CSS via CDN -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">

    <?php
        $username = $_POST["username"];
        $password = $_POST["password"]; //password123

        //$hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $db_servername = "db";
        $db_username = "root";
        $db_password = "rootpassword";
        $db_name = "People";

        // Create connection
        $conn = new mysqli($db_servername, $db_username, $db_password, $d_bname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare the SQL statement
        $stmt = $conn->prepare("SELECT `id`, `lastname`, `firstname`, `email`, `password` FROM People.Users
             WHERE email = ? AND password = ?");

        // Bind parameters
        $stmt->bind_param("ss", $username, $password);

        // Execute the statement
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        // Fetch data
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $_SESSION["logged_in"] = true;
                $_SESSION["id"] = $row["id"];
                $_SESSION["lastname"] = $row["lastname"];
                $_SESSION["firstname"] = $row["firstname"];
                $_SESSION["email"] = $row["email"];
            }
            echo "valid login";
            echo "<br/><a href=\"page3.php\">go to page 3</a>";
        } else {
            echo "invalid login";
            echo "<br/><a href=\"page1.php\">go back to login</a>";
        }

        // Close the statement
        $stmt->close();
        ?>

    </div>

    <?php include 'session.php';?>

    <!-- Include Bootstrap JS (optional) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>



