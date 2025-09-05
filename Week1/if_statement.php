<!DOCTYPE html>
<html>
    <body>

    <?
        $t = date("H");
        
        if ($t < "20") {
            echo "<p>Have a good day!</p>";
        } else {
            echo "<p>Have a good night!</p>";
        }
    ?>    

    </body>
</html>