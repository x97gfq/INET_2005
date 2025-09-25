const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("enter your password:",
    (password) => {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        console.log("strength: " + strength);

        if (strength === 5) console.log("strong password");
        else if (strength === 4 || strength === 3) console.log("moderate password");
        else console.log("weak password");
        rl.close();
    }
)


/*

check length >= 8 characters & use regex to check for
/[A-Z]/ - uppercase
/[a-z]/ - lowercase
/[0-9]/ - numbers
/[^A-Za-z0-9][^,]/ - special characters

score 1 point for each

< 3: weak
3 or 4: moderate
5: strong

*/
