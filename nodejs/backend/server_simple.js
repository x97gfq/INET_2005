// INET 2005 – MFlix API (Node.js + Express + MongoDB)
// ---------------------------------------------------------------
// Endpoints provided (all GET):
//   GET    /api/health                     – quick health check
//   GET    /api/movies/:id                 – movie by ObjectId
//
// Quick start:
//   2) npm install
//   3) node server-simple.js

// --- Import required modules ---
const express = require('express');               // Web framework for Node.js
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client and ObjectId helper
const cors = require('cors');                     // Enables Cross-Origin Resource Sharing
const morgan = require('morgan');                 // HTTP request logger middleware
require('dotenv').config();                       // Loads environment variables from .env file

// --- Initialize Express app ---
const app = express();
const PORT = process.env.PORT; // Port number from .env file

// --- Middleware setup ---
// These functions run before your routes and help process requests
app.use(cors());              // Allow requests from other origins (e.g., frontend apps)
app.use(express.json());      // Automatically parse incoming JSON payloads
app.use(morgan('dev'));       // Log HTTP requests to the console in 'dev' format

// --- MongoDB connection setup ---
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection string
const DB_NAME = process.env.DB_NAME;         // Database name
const COLLECTION = 'movies';                 // Collection name

let client;           // Will hold the MongoClient instance
let moviesCollection; // Will hold a reference to the 'movies' collection

/**
 * Initializes the MongoDB client and connects to the database.
 * This is called once and reused for all requests.
 */
async function initMongo() {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {
      directConnection: true // Helps when connecting to standalone localhost MongoDB
    });
    await client.connect(); // Connect to MongoDB server
    const db = client.db(DB_NAME); // Select the database
    moviesCollection = db.collection(COLLECTION); // Cache the collection reference
  }
}

// --- Middleware to ensure DB is connected before handling requests ---
app.use(async (req, res, next) => {
  try {
    if (!moviesCollection) {
      await initMongo(); // Connect to MongoDB if not already connected
    }
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({
      error: 'Database connection failed',
      details: String(err)
    });
  }
});

// --- Routes ---

/**
 * Health check endpoint.
 * Useful for verifying that the server is running.
 * Accessible via GET /api/health or GET /
 */
app.get(['/api/health', '/'], (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString() // Current server time
  });
});

/**
 * Fetch a movie document by its MongoDB ObjectId.
 * Example: GET /api/movies/64f1c2e8a1b2c3d4e5f6a7b8
 */
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    // Query the database for the movie with the given _id
    const doc = await moviesCollection.findOne({ _id: new ObjectId(id) });

    if (!doc) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(doc); // Return the movie document
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch movie',
      details: String(err)
    });
  }
});

// --- Graceful shutdown handler ---
// Ensures MongoDB connection is closed when the server is stopped
process.on('SIGINT', async () => {
  if (client) await client.close(); // Close MongoDB connection
  process.exit(0); // Exit the Node.js process
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`INET 2005 MFlix API listening on http://localhost:${PORT}`);
});