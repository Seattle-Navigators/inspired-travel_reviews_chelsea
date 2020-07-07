const mongoose = require('mongoose');

const DB = process.env.DB || 'localhost';

mongoose.connect(`mongodb://${DB}/reviews`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const reviewSchema = mongoose.Schema({
  attractionId: String,
  attractionName: String,
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
  uploadImages: [Map],
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
