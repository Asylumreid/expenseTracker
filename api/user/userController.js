const bcrypt = require('bcrypt');
const dbService = require('../../services/dbService');
const config = require('../../config/config');
function getUser(req, res, next) {
    res.send('User');
}

async function login(req, res, next) {
    let user = {
        uid: 0,
        username: req.body.username,
        password: req.body.password,
    };

    dbService.pool.query(
        'SELECT * FROM Users WHERE username = ?',
        [user.username],
        function (err, rows, fields) {
            if (err || rows.length <= 0) {
                res.status(500).send({
                    message: err ?? 'Some error occurred while logging in',
                });
            } else {
                let userDetails = rows[0];
                res.status(200).cookie('User', {
                    uid: userDetails.uid,
                    username: userDetails.username,
                    loggedIn: true,
                }).redirect('/');
                // res.redirect('/transaction');
                // res.end()
            }
            // console.log(rows[0]);
        }
    );
}

async function createUser(req, res, next) {
    let userPassword = req.body.password;
    bcrypt
        .hash(userPassword, 10)
        .then((hash) => {
            let user = {
                username: req.body.username,
                password: hash,
            };
            console.log(user)
            dbService.pool.query(
                'INSERT INTO Users(username, password) VALUES (?,?)',
                [user.username, user.password],
                function (err, rows, fields) {
                    if (err) {
                        return res.status(500).send({
                            message:
                                err.message ||
                                'Some error occurred while registering account.',
                        });
                    }
                    user = {
                        uid: rows.insertId,
                        username: req.body.username,
                    };
                    res.status(201).cookie('User', {
                        User: user,
                        loggedIn: true,
                    });
                    res.redirect('/');
                    res.end();
                }
            );
            // query(
            //     'INSERT INTO Users(username, password) VALUES (?,?)',
            //     [user.username, user.password]
            // ).then(()=>{
            //     res.send({
            //         msg: 'Success',
            //     });
            // }).catch((err)=>{
            //     res.status(500).send({
            //         message:
            //             err.message ||
            //             'Some error occurred while hashing password.',
            //     });
            // });
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while hashing password.',
            });
        });
}
//Might not do
function editUser(req, res, next) {}

function deleteUser(req, res, next) {}

module.exports = {
    getUser: getUser,
    login: login,
    createUser: createUser,
    updateUser: editUser,
    deleteUser: deleteUser,
};
