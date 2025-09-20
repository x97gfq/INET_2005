const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const choices = ['rock', 'paper', 'scissors'];

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
};

rl.question('Choose rock, paper, or scissors: ', (answer) => {
    const playerChoice = answer.toLowerCase();
    const computerChoice = getComputerChoice();

    console.log(`You chose: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    var result = determineWinner(playerChoice, computerChoice);
    console.log(result);

    rl.close();
});
