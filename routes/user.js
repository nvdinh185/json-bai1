const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getListUsers);
router.get('/:id', userController.getUserById);

router.post('/', userController.postRegister);
router.put('/', userController.postUpdate);
router.delete('/:id', userController.postDelete);

module.exports = router;
