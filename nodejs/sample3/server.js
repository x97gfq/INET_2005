// INET 2005 – Restaurant API (Node.js + Express + Mongoose)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
require('dotenv').config(); // Loads environment variables from .env file

const Restaurant = require('./models/Restaurant');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

app.use(cors());
app.use(express.json());

// connect to the database and start listening for http requests.
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => 
    {
      console.log('Connected to MongoDB via Mongoose')
      
      app.listen(PORT, () => {
        console.log(`INET 2005 Restaurants API listening on http://localhost:${PORT}`);
      });

    }
  )
  .catch(err => {
    console.error('MongoDB connection error:', err)
  }
);

// Swagger Setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.1',
      description: 'API for managing restaurant data',
    },
  },
  apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns API status and current time
 */

app.get(['/api/health', '/'], (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});


/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant data
 *       404:
 *         description: Restaurant not found
 */

app.get('/api/restaurants/:id', jwtMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    //throw new Error('Something went wrong!');
    const doc = await Restaurant.findById(id);
    if (!doc) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID', details: err.message });
  }
});


/**
 * @swagger
 * /api/restaurants/borough/{borough}:
 *   get:
 *     summary: Get restaurants by borough
 *     parameters:
 *       - in: path
 *         name: borough
 *         required: true
 *         schema:
 *           type: string
 *         description: Borough name
 *     responses:
 *       200:
 *         description: List of restaurants in the borough
 */

app.get('/api/restaurants/borough/:borough', async (req, res) => {
  try {
    const borough = req.params.borough;
    const items = await Restaurant.find({ borough: new RegExp(borough, 'i') }).limit(50);
    res.json({ count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});


/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Restaurant created
 *   get:
 *     summary: Get paginated list of restaurants
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of restaurants
 */

app.post('/api/restaurants', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const saved = await newRestaurant.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create restaurant', details: err.message });
  }
});


/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Restaurant updated
 *       404:
 *         description: Restaurant not found
 */

app.put('/api/restaurants/:id', async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ updated });
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
});


/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted
 *       404:
 *         description: Restaurant not found
 */

app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ deletedCount: 1 });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err.message });
  }
});


/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get paginated restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (1-based)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               page: 1
 *               limit: 10
 *               totalPages: 5
 *               totalCount: 42
 *               count: 10
 *               items:
 *                 - _id: "66f0c3e3a12b34567890abcd"
 *                   name: "Cedar Street Grill"
 *                   cuisine: "Canadian"
 *       500:
 *         description: Server error
 */

app.get('/api/restaurants', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await Restaurant.countDocuments();
    const items = await Restaurant.find().skip(skip).limit(limit);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ page, limit, totalPages, totalCount, count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants', details: err.message });
  }
});
