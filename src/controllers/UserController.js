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

            const sqlSelect = "SELECT * FROM users2";
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

            const sqlSelect = `SELECT * FROM users2 WHERE id = '${id}'`;
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

    // [POST] /user/register
    async postRegister(req, res, next) {
        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        var { email, password, fullname, file } = req.form_data;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`INSERT INTO users2 (id, email, password, fullname, avatar) VALUES
                ('${generateUuid()}', '${email}', '${password}', '${fullname}', '${file}')`, (err, results) => {
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

    // [PUT] /user/update
    async postUpdate(req, res, next) {
        var { id, email, fullname, file } = req.form_data;
        // Nếu có chọn ảnh thì update ảnh, nếu không thì lấy lại ảnh cũ
        var avatarSql = file ? `avatar = "${file}"` : `avatar = avatar`;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`UPDATE users2 SET email = '${email}', fullname = '${fullname}',
                ${avatarSql} WHERE id = '${id}'`, (err, results) => {
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

    // [DELETE] /user/delete/:id
    async postDelete(req, res, next) {
        var id = req.params.id;

        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`DELETE FROM users2 WHERE id = '${id}'`, (err, results) => {
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
