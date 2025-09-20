// Function to roll a die and return a random number between 1 and 6
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to roll two dice and check for a tie
function rollUntilTie() {
    let die1, die2;
    let rollCount = 0;

    do {
        die1 = rollDie();
        die2 = rollDie();
        rollCount++;
        
        console.log(`Roll ${rollCount}: Die 1 = ${die1}, Die 2 = ${die2}`);
    } while (die1 !== die2);

    console.log(`It took ${rollCount} rolls to get a tie!`);
}

// Start the dice rolling
rollUntilTie();
