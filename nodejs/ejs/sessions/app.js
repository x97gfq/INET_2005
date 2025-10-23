const express = require('express');
const session = require('express-session');
const path = require('path');

/*
for demo purposes only, just to demonstrate sessions (not a real "login")
*/

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'b7f3c9e2d1a4f8c6e3a9d7b2a1c5e6f9',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', (req, res) => {
  console.log("req.session", req.session);
  res.render('index', { username: req.session.username });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  req.session.username = username;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.redirect('/');
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});