const express = require('express');
const app = express();
const PORT = 3001;

// Hard-coded valid token (in real apps, use JWT verification)
const VALID_TOKEN = 'myHardcodedBearerToken123';

function checkBearerToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (token !== VALID_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  //console.log("token is valid");
  next(); // Token is valid
}

app.get('/secure-data', checkBearerToken, (req, res) => {
  res.json({ message: 'Access granted to secure data!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
