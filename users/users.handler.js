const config = require('../config.json');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    getListUsers,
    postLogin,
    postUpdate
}

async function getListUsers() {
    const listNews = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listNews;
}

async function postLogin(body) {
    try {
        const user = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users WHERE email = '${body.email}' AND password = '${body.password}'`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        // console.log(user);
        if (user && user[0]) {
            const token = jwt.sign({ id: user[0].id, role: user[0].role }, config.secret);
            const { password, ...userWithoutPassword } = user[0];
            return {
                ...userWithoutPassword,
                token
            };
        } else {
            throw new Error("Cannot find user!");
        }

    } catch (error) {
        throw new Error(error);
    }
}

async function postUpdate(formData) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE users SET email = ?, fullname = ?, avatar = ? WHERE id = ?`,
            [formData.email, formData.fullname, formData.file, formData.id], function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
    })
}