const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', () => {
  // subdocument
  const userSchema = mongoose.Schema({
    contributions: Number,
    name: String,
    image: String,
  });

  // main document
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
    user: userSchema,
    imageUrls: [String],
  });

  const Review = mongoose.model('Review', reviewSchema);

  // Testing connection
  Review.create({ user: { contributions: 15 }, imageUrls: ['test', 'foo'] })
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
});
