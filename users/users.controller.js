const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');
const usersMiddleware = require('./users.middleware');

// routes
router.get('/', usersMiddleware.authorize, getListUsers);

router.post('/login', postLogin);
router.post('/update', usersMiddleware.uploadFile, postUpdate);

module.exports = router;

function getListUsers(req, res, next) {
    usersHandler.getListUsers()
        .then(listUsers => res.json(listUsers))
        .catch(err => next(err));
}

function postLogin(req, res, next) {
    usersHandler.postLogin(req.body)
        .then(result => res.json(result))
        .catch(err => next(err));
}

function postUpdate(req, res, next) {
    usersHandler.postUpdate(req.form_data)
        .then(result => res.json(result))
        .catch(err => next(err));
}