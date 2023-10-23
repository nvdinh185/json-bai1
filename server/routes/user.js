const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const middleware = require('../middleware/Middleware');

router.get('/', middleware.authorize, userController.getListUsers);
router.get('/:id', middleware.authorize, userController.getUserById);

router.post('/login', userController.postLogin);
router.put('/update', middleware.authorize, middleware.uploadFile, userController.postUpdate);
router.delete('/delete/:id', middleware.authorize, userController.postDelete);

module.exports = router;
