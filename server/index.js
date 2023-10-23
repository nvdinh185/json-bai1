const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./_helpers/error-handler');

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

const route = require('./routes');

// Router init
route(app);

// global error handler
app.use(errorHandler);

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));