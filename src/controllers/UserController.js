const config = require('../config.json');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "users"
};

class UserController {

    // [GET] /user
    async getListUsers(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = "SELECT * FROM users";
            const listUsers = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(listUsers);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /user/login
    async postLogin(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const user = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                })
            })
            // console.log(user[0]);
            if (user && user[0]) {
                const token = jwt.sign({ id: user[0].id, role: user[0].role }, config.secret, {
                    expiresIn: '600000'//10 phút
                });
                const { password, ...userWithoutPassword } = user[0];
                var result = {
                    ...userWithoutPassword,
                    token
                }
                res.status(200).send(result);
            } else {
                throw new Error("Cannot find users!");
            }
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /user/update
    async postUpdate(req, res, next) {
        var formData = req.form_data;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`UPDATE users SET email = '${formData.email}', fullname = '${formData.fullname}',
                avatar = "${formData.file ? formData.file : 'avatar'}" WHERE id = '${formData.id}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }
}

module.exports = new UserController();
