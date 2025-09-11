<br/><br/>
<p><b>Session variables:</b></p>
<?php
$sessionId = session_id();
echo "<P><b>session_id: " . $sessionId . "</P>";
if (isset($_SESSION)) {
    echo "<ul>";
    foreach($_SESSION as $key => $value) {
        echo "<li>" . $key . ": " . $value . "</li>";
    }
    echo "</ul>";
}
?>