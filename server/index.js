const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const Review = require('../database/Reviews.js');

const port = 3004;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'client', 'public')));

app.get('/:productId/api/reviews', (req, res) => {
  Review.find({ attractionId: req.params.productId }, (err, docs) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(docs);
    }
  });
});

app.patch('/:productId/api/reviews/:reviewId', (req, res) => {
  Review.updateOne({ _id: req.params.reviewId }, { helpful: true }, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('reviewpatch');
      res.sendStatus(200);
    }
  });
});

app.patch('/:productId/api/reviews/:reviewId/:imageId', (req, res) => {
  Review.collection.updateOne({
    'uploadImages.id': req.params.imageId,
  }, {
    $set: { 'uploadImages.$.helpful': true },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log('good to go');
});
