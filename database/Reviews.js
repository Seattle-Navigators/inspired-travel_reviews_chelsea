const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const reviewSchema = mongoose.Schema({
  attractionId: Number,
  rating: Number,
  travelType: String,
  expDate: Date,
  lang: String,
  body: String,
  title: String,
  votes: Number,
  createdAt: Date,
  helpful: Boolean,
  user: {
    originCountry: String,
    originRegion: String,
    contributions: Number,
    name: String,
    profileImage: String,
  },
  uploadImages: [String],
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
