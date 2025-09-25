const readline = require('readline');

const responses = [
  "It is certain.",
  "Without a doubt.",
  "You may rely on it.",
  "Ask again later.",
  "Cannot predict now.",
  "Don't count on it.",
  "My reply is no.",
  "Very doubtful."
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your question?\n", 
  (question) => {
    console.log(question);
    var rnd = Math.floor(Math.random() * responses.length);
    var ans = responses[rnd];
    console.log(`Magic-8 Ball says ${ans}`);
    rl.close();
  }
);

