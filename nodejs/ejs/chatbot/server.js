
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* handle the index page, pass the view (/views/chat.ejs) and data model to render */
app.get('/', (req, res) => {
  res.render('chat', { response: null });
});

/* handle the index page form submission, add the ChatGPT completions response to the response param in the view */
app.post('/chatgpt', async (req,res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: "system", content: "You're a crass Bostonian.  Repsond like a Bostonian."},
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          'Authorization' : `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("response.data", response.data);

    /* response path in JSON is response.data.choices[0].messages.content, pass into data model as response param, view is /views/chat.ejs */
    res.render('chat', { response: response.data.choices[0].message.content })

  } catch(err) {
    console.error(err);
    res.render('chat', { response: err })
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
