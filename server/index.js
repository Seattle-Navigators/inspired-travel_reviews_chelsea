const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 3004;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log('good to go');
});
