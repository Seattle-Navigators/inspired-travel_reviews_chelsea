const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { findForId, updateReview, updateImage } = require('./routeHandlers.js');

const port = 3004;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'client', 'public')));

app.get('/:productId/api/reviews', findForId);
app.patch('/:productId/api/reviews/:reviewId', updateReview);
app.patch('/:productId/api/reviews/:reviewId/:imageId', updateImage);

app.listen(port, () => {
  console.log('good to go');
});
