const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const middleware = require('../middleware/Middleware');

router.get('/', userController.getListUsers);
router.get('/:id', userController.getUserById);

router.post('/', middleware.uploadFile, userController.postRegister);
router.put('/:id', middleware.uploadFile, userController.postUpdate);
router.delete('/:id', userController.postDelete);

module.exports = router;
