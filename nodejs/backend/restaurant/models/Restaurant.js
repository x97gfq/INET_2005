const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borough: String,
  cuisine: String,
  address: {
    building: String,
    street: String,
    zipcode: String,
    coord: [Number]
  },
  grades: [
    {
      date: Date,
      grade: String,
      score: Number
    }
  ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants');
