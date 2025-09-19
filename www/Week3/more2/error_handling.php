<?php
class CustomException extends Exception {}

function divide($a, $b) {
    if ($b == 0) {
        throw new CustomException("Division by zero.");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (CustomException $e) {
    error_log("Error: " . $e->getMessage());
    echo "An error occurred. Please try again later.";
}
?>
