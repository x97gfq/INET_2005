// INET 2005 – MFlix API (Node.js + Express + MongoDB)
// ---------------------------------------------------------------
// Endpoints provided (all GET):
//   GET    /api/health                     – quick health check
//   GET    /api/movies                     – list movies (pagination + filters)
//   GET    /api/movies/:id                 – movie by ObjectId
//   GET    /api/movies/search/:title       – search by title
//   GET    /api/movies/actor/:name         – search by cast member
//   GET    /api/movies/year/:year          – movies released in a year
//   GET    /api/movies/genre/:genre        – movies with a genre
//
// Quick start:
//   1) npm install
//   2) npm start

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Mongo connection (single shared client) ---
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION = 'movies';

let client;           // MongoClient instance
let moviesCollection; // Cached handle to the movies collection

async function initMongo() {
  if (!client) {
    client = new MongoClient(MONGODB_URI, { 
      // directConnection helps when connecting to standalone localhost
      directConnection: true
    });
    await client.connect();
    const db = client.db(DB_NAME);
    moviesCollection = db.collection(COLLECTION);
  }
}

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    if (!moviesCollection) {
      await initMongo();
    }
    next();
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ error: 'Database connection failed', details: String(err) });
  }
});

// --- Routes ---
app.get(['/api/health', '/'], (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Basic list with pagination and optional filters
//   /api/movies?limit=20&page=1
//   Optional filters:
//     title=string (partial, case-insensitive)
//     actor=string (partial, case-insensitive match within cast[])
//     year=YYYY
//     genre=string (exact within genres[]; partial allowed)
app.get('/api/movies', async (req, res) => {
  try {
    const {
      page = '1',
      limit = '20',
      title,
      actor,
      year,
      genre,
      sort = 'title',    // default sort
      order = 'asc'
    } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (actor) {
      // cast: ["Actor One", "Actor Two", ...]
      query.cast = { $regex: actor, $options: 'i' };
    }

    if (year) {
      const y = parseInt(year, 10);
      if (!Number.isNaN(y)) query.year = y;
    }

    if (genre) {
      // genres: ["Action", "Drama", ...]
      // allow partial case-insensitive matches using $elemMatch + regex
      query.genres = { $elemMatch: { $regex: genre, $options: 'i' } };
    }

    const sortSpec = { [sort]: (String(order).toLowerCase() === 'desc' ? -1 : 1) };

    const cursor = moviesCollection.find(query).sort(sortSpec)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    const [items, total] = await Promise.all([
      cursor.toArray(),
      moviesCollection.countDocuments(query)
    ]);

    res.json({
      page: pageNum,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies', details: String(err) });
  }
});

// Get movie by ObjectId
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const doc = await moviesCollection.findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: 'Movie not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movie', details: String(err) });
  }
});

// Search by title
app.get('/api/movies/search/:title', async (req, res) => {
  try {
    const { q } = req.params;
    console.log(q);
    const regex = new RegExp(q, 'i');
    const items = await moviesCollection.find({ title: { $regex: regex } })
      .limit(50)
      .toArray();

      console.log("here");

      res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed', details: String(err) });
  }
});

// Search by actor name (path param)
app.get('/api/movies/actor/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(name, 'i');
    const items = await moviesCollection.find({ cast: { $regex: regex } })
      .limit(50)
      .toArray();
    res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Actor search failed', details: String(err) });
  }
});

// Filter by year
app.get('/api/movies/year/:year', async (req, res) => {
  try {
    const y = parseInt(req.params.year, 10);
    if (Number.isNaN(y)) return res.status(400).json({ error: 'Year must be a number' });
    const items = await moviesCollection.find({ year: y }).limit(50).toArray();
    res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Year filter failed', details: String(err) });
  }
});

// Filter by genre
app.get('/api/movies/genre/:genre', async (req, res) => {
  try {
    const g = req.params.genre;
    const items = await moviesCollection
      .find({ genres: { $elemMatch: { $regex: new RegExp(g, 'i') } } })
      .limit(50)
      .toArray();
    res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Genre filter failed', details: String(err) });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) await client.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`INET 2005 MFlix API listening on http://localhost:${PORT}`);
});
