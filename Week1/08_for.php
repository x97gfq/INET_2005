<!DOCTYPE html>
<html>
    <body style="font-family: courier;">
        <?php

        $height = 10;

        for ($i = 1; $i <= $height; $i++) {

            // Print leading spaces
            for ($j = $i; $j < $height; $j++) {
                echo "&nbsp;";
            }

            // Print asterisks
            for ($k = 1; $k <= (2 * $i - 1); $k++) {
                echo "*";
            }

            echo "<br/>";
        }
        ?>
    </body>
</html>