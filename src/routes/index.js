const users = require('./users');

function route(app) {
    app.use('/users', users);
}

module.exports = route;
