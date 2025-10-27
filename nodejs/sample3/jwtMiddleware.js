const jwt = require('jsonwebtoken');

require('dotenv').config();

// JWT token-related
const JWT_SECRET = process.env.JWT_SECRET;
const EXPECTED_ISSUER = process.env.EXPECTED_ISSUER;
const EXPECTED_AUDIENCE = process.env.EXPECTED_AUDIENCE;
const EXPECTED_SCOPE = process.env.EXPECTED_SCOPE;


function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: EXPECTED_ISSUER,
      audience: EXPECTED_AUDIENCE,
    });

    // Check expiration (handled by jwt.verify)
    // Check subject
    if (!decoded.sub) {
      return res.status(401).json({ error: 'Missing subject in token' });
    }

    // Check custom claim: scope
    if (!decoded.scope || !decoded.scope.includes(EXPECTED_SCOPE)) {
      return res.status(403).json({ error: 'Insufficient scope' });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token', details: err.message });
  }
}

module.exports = jwtMiddleware;