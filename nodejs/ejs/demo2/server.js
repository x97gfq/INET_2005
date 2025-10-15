const express = require('express');
const app = express();
const port = 3001;

// Using EJS views (/views folder)
app.set('view engine', 'ejs');

// Serve the index page
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
