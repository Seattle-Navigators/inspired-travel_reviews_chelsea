const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const { findForId, updateReview, updateImage } = require('./routeHandlers.js');

const port = 3004;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');
const publicBundle = path.resolve(__dirname, '..', 'client', 'public', 'bundle.js');
const options = {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  },
};

const app = express();

app.use(cors({origin: 'http://127.0.0.1:3000'}));
app.use(morgan('dev'));
app.use(bodyParser.json());

// app.set('trust proxy', 'loopback');

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
//   res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//   res.set('Access-Control-Allow-Headers', '*');
//   next();
// });
// app.use('/:productId/', express.static(publicDir, options));
app.use('/:productId/test', express.static(publicDir));
// app.use('/:productId/', express.static(publicBundle, options));
// app.get('/:productId/', (req, res) => {
//   res.status(200);
//   res.sendFile(publicBundle);
// });

// app.get('/:productId/test2', (req, res) => {
//   res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
//   res.status(200);
//   res.sendFile(publicBundle);
// });
app.get('/:productId/api/reviews', findForId);
app.patch('/:productId/api/reviews/:reviewId', updateReview);
app.patch('/:productId/api/reviews/:reviewId/:imageId', updateImage);

app.listen(port, () => {
  console.log(`good to go on port ${port}`);
});
