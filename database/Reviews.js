const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', () => {
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

  // Testing connection
  Review.create({ user: { contributions: 13 }, uploadImages: ['test', 'foo'] })
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
});
