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
    // getNewsDetail,
    // getCategories,
    // postContact
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

async function getNewsDetail(query) {
    const newsDetail = await new Promise((resolve, reject) => {
        db.each(`SELECT * FROM news WHERE id = ${query.dId}`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return newsDetail;
}

async function getCategories() {
    const listCats = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM categories`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listCats;
}

async function postContact(contact) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO contacts (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
            [contact.name, contact.phone, contact.web,
            contact.gender, contact.file, contact.content], function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
    })
}