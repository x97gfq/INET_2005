// INET 2005 – Restaurant API (Node.js + Express + MongoDB)
// --------------------------------------------------------
// Quick start:
// 2) npm install
// 3) node restaurant_service.js

// --- Import required modules ---
const express = require('express'); // Web framework for Node.js
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client and ObjectId helper
const cors = require('cors'); // Enables Cross-Origin Resource Sharing
const morgan = require('morgan'); // HTTP request logger middleware
require('dotenv').config(); // Loads environment variables from .env file

// --- Initialize Express app ---
const app = express();
const PORT = process.env.PORT; // Port number from .env file

// --- Middleware setup ---
// These functions run before your routes and help process requests
app.use(cors()); // Allow requests from other origins (e.g., frontend apps)
app.use(express.json()); // Automatically parse incoming JSON payloads
app.use(morgan('dev')); // Log HTTP requests to the console in 'dev' format

// --- MongoDB connection setup ---
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection string
const DB_NAME = process.env.DB_NAME; // Database name
const COLLECTION = 'restaurants'; // Collection name

let client; // Will hold the MongoClient instance
let restaurantsCollection; // Will hold a reference to the 'restaurants' collection

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
    restaurantsCollection = db.collection(COLLECTION); // Cache the collection reference
  }
}

// --- Middleware to ensure DB is connected before handling requests ---
app.use(async (req, res, next) => {
  try {
    if (!restaurantsCollection) {
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
 * Fetch a restaurant document by its MongoDB ObjectId.
 * Example: GET /api/restaurants/64f1c2e8a1b2c3d4e5f6a7b8
 */
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    // Query the database for the restaurant with the given _id
    const doc = await restaurantsCollection.findOne({ _id: new ObjectId(id) });

    if (!doc) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(doc); // Return the restaurant document
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch restaurant',
      details: String(err)
    });
  }
});

/**
 * Search restaurants by borough (case-insensitive).
 * Example: GET /api/restaurants/borough/Manhattan
 */
app.get('/api/restaurants/borough/:borough', async (req, res) => {
  try {
    const { q } = req.params;
    console.log(q);

    // Create a case-insensitive regex for borough search
    const regex = new RegExp(q, 'i');

    // Find matching restaurants, limit to 50 results
    const items = await restaurantsCollection.find({ borough: { $regex: regex } })
      .limit(50)
      .toArray();

    res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed', details: String(err) });
  }
});

/**
 * Create a new restaurant document.
 * Example: POST /api/restaurants
 * Body: JSON object with restaurant details
 */
app.post('/api/restaurants', async (request, response) => {
  try {
    const newRestaurant = request.body;

    // Insert the new restaurant into the collection
    const result = await restaurantsCollection.insertOne(newRestaurant);
    const newId = result.insertedId;

    response.status(201).json({ insertedId: newId });
  } catch(err) {
    console.error(err);
    response.status(400).json({ error: 'Failed to create restaurant', details: String(err) });
  }
});

/**
 * Update an existing restaurant document by ID.
 * Example: PUT /api/restaurants/:id
 * Body: JSON object with fields to update
 */
app.put('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    // Update the restaurant document
    const result = await restaurantsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ updatedCount: result.modifiedCount });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update restaurant', details: String(err) });
  }
});

/**
 * Delete a restaurant document by ID.
 * Example: DELETE /api/restaurants/:id
 */
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    // Delete the restaurant document
    const result = await restaurantsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    let delcount = result.deletedCount;
    res.json({ deletedCount: delcount });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete restaurant", details: String(err) });
  }
});

/**
 * Fetch a paginated list of restaurants.
 * Example: GET /api/restaurants?page=2&limit=5
 * GET /api/restaurants?page=1&limit=10 → First 10 restaurants
 * GET /api/restaurants?page=2&limit=5 → Second page with 5 restaurants per page
 */
app.get('/api/restaurants', async (req, res) => {
  try {
    // Parse query parameters with defaults
    const page = parseInt(req.query.page) || 1;       // Default to page 1
    const limit = parseInt(req.query.limit) || 10;    // Default to 10 items per page
    const skip = (page - 1) * limit;                  // Calculate how many documents to skip

    // Get total number of documents
    const totalCount = await restaurantsCollection.countDocuments();

    // Fetch paginated documents
    const items = await restaurantsCollection.find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return paginated results with metadata
    res.json({
      page,
      limit,
      totalPages,
      totalCount,
      count: items.length,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: String(err) });
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
  console.log(`INET 2005 Restaurants API listening on http://localhost:${PORT}`);
});