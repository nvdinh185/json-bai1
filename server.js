const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const publicPath = path.join(__dirname, "client");
app.use(express.static(publicPath));

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));