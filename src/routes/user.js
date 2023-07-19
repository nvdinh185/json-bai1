const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const middleware = require('../middleware/Middleware');

router.get('/', userController.getListUsers);
router.get('/:id', userController.getUserById);

router.put('/update', middleware.uploadFile, userController.postUpdate);
router.delete('/delete/:id', userController.postDelete);

module.exports = router;
