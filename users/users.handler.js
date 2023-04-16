const config = require('../config.json');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';

module.exports = {
    getListUsers,
    postLogin,
    postUpdate
}

async function getListUsers(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();

        const listUsers = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listUsers);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postLogin(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();

        const user = await new Promise((resolve, reject) => {
            db.each(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        // console.log(user);
        if (user) {
            const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
                expiresIn: '600000'//10 phút
            });
            const { password, ...userWithoutPassword } = user;
            var result = {
                ...userWithoutPassword,
                token
            }
            res.json(result);
        } else {
            throw new Error("Cannot find users!");
        }
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postUpdate(req, res, next) {
    var formData = req.form_data;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();

        var result = await new Promise((resolve, reject) => {
            db.run(`UPDATE users SET email = '${formData.email}', fullname = '${formData.fullname}',
            avatar = "${formData.file ? formData.file : 'avatar'}" WHERE id = '${formData.id}'`, function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
        })
        res.json(result);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}