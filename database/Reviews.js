const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', () => {
  const reviewSchema = mongoose.Schema({
    attractionId: Number,
    rating: Number,
    userType: String,
    expDate: Date,
    lang: String,
    body: String,
    title: String,
    userOrigin: String,
    votes: Number,
    user: {
      id: Number,
      contributions: Number,
      name: String,
      image: String,
    },
    images: {
      id: Number,
      url: String,
    },
  });

  const Review = mongoose.model('Review', reviewSchema);

  // Testing connection
  Review.create({ rating: 5 })
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
});
