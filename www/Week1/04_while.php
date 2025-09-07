<!DOCTYPE html>
<html>
    <body>
        <?php
        $total = 0;

        $how_many_rolls = 0;

        while($total < 100) {
            $how_many_rolls++;
            $num = rand(1,6);
            $total += $num;
            echo "<br/>rolled " . $num . " for total " . $total . "\n";
        }

        echo "<p>how many rolls? " . $how_many_rolls . "</p>";

        ?>
    </body>
</html>