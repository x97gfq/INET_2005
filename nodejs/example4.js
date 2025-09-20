const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const numberToGuess = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const askQuestion = () => {
    rl.question('Guess the number (between 1 and 100): ', (answer) => {
        const guess = parseInt(answer, 10);
        attempts++;

        if (guess === numberToGuess) {
            console.log(`Correct! You guessed the number in ${attempts} attempts.`);
            rl.close();
        } else if (guess < numberToGuess) {
            console.log('Too low!');
            askQuestion();
        } else {
            console.log('Too high!');
            askQuestion();
        }
    });
};

askQuestion();
