const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const usersMiddleware = require('../middleware/UsersMiddleware');

router.get('/', usersMiddleware.authorize, usersController.getListUsers);

router.post('/login', usersController.postLogin);
router.post('/update', usersMiddleware.authorize, usersMiddleware.uploadFile, usersController.postUpdate);

module.exports = router;
