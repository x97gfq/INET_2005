// INET 2005 – Restaurant API (Node.js + Express + Mongoose)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')}); // Loads environment variables from .env file

const Restaurant = require('./models/Restaurant');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.1',
      description: 'API for managing restaurant data',
    },
  },
  apis: ['./restaurant_service_mongoose.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get(['/api/health', '/'], (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    //console.log("req.params.id",req.params.id);
    const doc = await Restaurant.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID', details: err.message });
  }
});

app.get('/api/restaurants/borough/:borough', async (req, res) => {
  try {
    const borough = req.params.borough;
    const items = await Restaurant.find({ borough: new RegExp(borough, 'i') }).limit(50);
    res.json({ count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

app.post('/api/restaurants', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const saved = await newRestaurant.save();
    res.status(201).json({ insertedId: saved._id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create restaurant', details: err.message });
  }
});

app.put('/api/restaurants/:id', async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ updated });
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
});

app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ deletedCount: 1 });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err.message });
  }
});

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

app.listen(PORT, () => {
  console.log(`INET 2005 Restaurants API listening on http://localhost:${PORT}`);
});
