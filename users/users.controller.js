const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');
const usersMiddleware = require('./users.middleware');

// routes
router.get('/', usersMiddleware.authorize, usersHandler.getListUsers);

router.post('/login', usersHandler.postLogin);
router.post('/update', usersMiddleware.authorize, usersMiddleware.uploadFile, usersHandler.postUpdate);

module.exports = router;