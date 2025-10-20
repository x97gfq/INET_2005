
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* add route here */

app.post('/', async (req,res) => {
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
    res.json(response.data);

  } catch(err) {
    console.error(err);
  }

});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
