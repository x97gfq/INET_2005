<?php
//https://www.geeksforgeeks.org/php/how-to-use-bcrypt-for-hashing-passwords-in-php/
//https://www.w3docs.com/snippets/php/how-to-use-bcrypt-to-hash-passwords-in-php.html

function encryptPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Example usage
$original = "pass123";
$encrypted = encryptPassword($original);
echo "Encrypted: " . $encrypted . "\n";
echo "Verified: " . (verifyPassword($original, $encrypted) ? "Valid" : "Invalid");
?>