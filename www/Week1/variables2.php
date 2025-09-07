<!DOCTYPE html>
<html>
    <body>

        <?php
            $greeting = "Hello";
            $username = "inet 2005!";
        ?>

        <p>This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... </p>
        <p>This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... </p>
        <p>This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... This is some paragraph text... </p>

        <?php
            $message = $greeting . ", " . $username;
            echo $message;
        ?>

    </body>
</html>