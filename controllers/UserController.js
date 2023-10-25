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

            const sqlSelect = "SELECT * FROM users1";
            const listUsers = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(listUsers);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /user/:id
    async getUserById(req, res, next) {
        var id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = `SELECT * FROM users1 WHERE id = '${id}'`;
            const userById = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(userById[0]);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /user
    async postRegister(req, res, next) {
        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        var { email, password, fullname } = req.body;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`INSERT INTO users1 (id, email, password, fullname) VALUES
                ('${generateUuid()}', '${email}', '${password}', '${fullname}')`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [PUT] /user
    async postUpdate(req, res, next) {
        var { id, email, password, fullname } = req.body;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`UPDATE users1 SET email = '${email}', password = ${password}, fullname = '${fullname}'
                WHERE id = '${id}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [DELETE] /user/:id
    async postDelete(req, res, next) {
        var id = req.params.id;

        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`DELETE FROM users1 WHERE id = '${id}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }
}

module.exports = new UserController();
