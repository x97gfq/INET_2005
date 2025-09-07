<!DOCTYPE html>
<html>
    <body>
        <?php
        $total = 0;

        while($total < 100) {
            $num = rand(1,6);
            $total += $num;
            echo "<br/>rolled " . $num . " for total " . $total . "\n";
        }
        ?>
    </body>
</html>