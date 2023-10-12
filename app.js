// const helmet = require('helmet');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiV1Router = require('./api/routes');
const query = require('./services/dbService');
const config = require('./config/config');
const cookieParser = require('cookie-parser');

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);

// let port = process.env.PORT || 8080;
// let host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const pageRouter = express.Router();
// app.use(helmet());
// app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

pageRouter.get('/', function (req, res) {
    let loggedIn = req.cookies.User;
    if (loggedIn === undefined) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname + '/index.html'));
    }
});

pageRouter.get('/transaction', function (req, res) {
    let loggedIn = req.cookies.User;
    if (loggedIn === undefined) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname + '/transaction.html'));
    }
});
pageRouter.get('/history', function (req, res) {
    let loggedIn = req.cookies.User;
    if (loggedIn === undefined) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname + '/history.html'));
    }
});

pageRouter.get('/login', function (req, res) {
    let loggedIn = req.cookies.User;
    if (loggedIn !== undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname + '/login.html'));
    }
});

pageRouter.get('/register', function (req, res) {
    let loggedIn = req.cookies.User;
    if (loggedIn !== undefined) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname + '/register.html'));
    }
});

pageRouter.get('/logout', function (req, res) {
    res.clearCookie('User')
    res.redirect('/login');
});

pageRouter.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/404.html'));

    res.status(404);
});

app.use('/api', apiV1Router);
app.use('/', pageRouter);
// Ignore the queries
// CREATE DATABASE IF NOT EXISTS expense_tracker;
// query(`
//     CREATE TABLE IF NOT EXISTS transaction (
//     tid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//     uid INT NOT NULL,
//     name VARCHAR(255),
//     type VARCHAR(255),
//     category VARCHAR(255),
//     date DATE,
//     amount Double,
//     FOREIGN KEY (uid) REFERENCES users(uid);
//     `);

// query(`
//     CREATE TABLE IF NOT EXISTS users (
//     uid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     UNIQUE(username));
//     `);

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
