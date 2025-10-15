const express = require('express');
const app = express();
const port = 3001;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Website',
        message: 'Hello, welcome to my website!'
    });
});

// Route for the portfolio page
app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        name: 'John Doe',
        projects: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
