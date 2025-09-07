<br/><br/>
<p>Session variables:</p>
<?php
if (isset($_SESSION)) {
    foreach($_SESSION as $key => $value) {
        echo "<P>" . $key . ": " . $value . "</P>";
    }
}
?>