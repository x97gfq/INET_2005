const readline = require('readline');

//sets up an interface for reading input from the command line in a Node.js environment
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['1. Berlin', '2. Madrid', '3. Paris', '4. Rome'],
        answer: 3
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['1. Earth', '2. Mars', '3. Jupiter', '4. Saturn'],
        answer: 2
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['1. Harper Lee', '2. J.K. Rowling', '3. Ernest Hemingway', '4. Mark Twain'],
        answer: 1
    }
];

let score = 0;
let currentQuestion = 0;

const askQuestion = () => {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        console.log(q.question);

        //The forEach() method in Node.js is used to iterate over the elements of an array, executing a provided function once for each element. 
        q.options.forEach(option => console.log(option));
        rl.question('Your answer: ', (answer) => {
            if (parseInt(answer, 10) === q.answer) {
                score++;
                console.log('Correct!');
            } else {
                console.log('Wrong!');
            }
            currentQuestion++;
            askQuestion();
        });
    } else {
        console.log(`Quiz over! Your score is ${score}/${questions.length}.`);
        rl.close();
    }
};

askQuestion();
