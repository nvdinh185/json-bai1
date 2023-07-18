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

    // [GET] /user/:id
    async getUserById(req, res, next) {
        var id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = `SELECT * FROM users WHERE id = ${id}`;
            const userById = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(userById[0]);
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
