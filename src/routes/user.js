const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const middleware = require('../middleware/Middleware');

router.get('/', middleware.authorize, userController.getListUsers);

router.post('/login', userController.postLogin);
router.post('/update', middleware.authorize, middleware.uploadFile, userController.postUpdate);

module.exports = router;
