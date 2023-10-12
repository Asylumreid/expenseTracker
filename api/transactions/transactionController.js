const dbService = require('../../services/dbService');

function getTransaction(req, res, next) {
    let user = req.cookies.User;
    // console.log(user)
    dbService.pool.query(
        'SELECT * FROM transaction WHERE uid = ?',
        [user.uid],
        function (err, rows, fields) {
            if (err) {
                return res.status(500).send({
                    message:
                        err ??
                        'Some error occurred while fetching transaction history',
                });
            }
            res.send(rows);
        }
    );
}

function createTransaction(req, res, next) {
    let user = req.cookies.User;

    const transaction = {
        uid: user.uid,
        name: req.body.name,
        transactionType: req.body.transactionType,
        category: req.body.category,
        date: req.body.date,
        amount: req.body.amount,
    };
    console.log(transaction)

    dbService.pool.query(
        'INSERT INTO Transaction (uid, name, type, category, date, amount) VALUES (?,?,?,?,?,?)',
        [
            transaction.uid,
            transaction.name,
            transaction.transactionType,
            transaction.category,
            transaction.date,
            transaction.amount,
        ],
        function (err, rows, fields) {
            if (err) {
                return res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while adding transactions.',
                });
            }
            return res.status(201).send({
                msg: 'Transaction created',
            });
        }
    );

    // Transaction.create(transaction)
    //     .then((data) => {
    //         res.send(data);
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message:
    //                 err.message ||
    //                 'Some error occurred while retrieving user data.',
    //         });
    //     });
}

function editTransaction(req, res, next) {}

function deleteTransaction(req, res, next) {
    let uid = req.body.uid;
    let tid = req.body.uid;
    dbService.pool.query(
        'DELETE FROM transaction WHERE uid = ? AND tid = ?',
        [uid, tid],
        function (err, rows, fields) {
            if (err) {
                return res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while registering account.',
                });
            }
            res.status(200);
        }
    );
}

module.exports = {
    getTransactions: getTransaction,
    createTransaction: createTransaction,
    updateTransaction: editTransaction,
    deleteTransaction: deleteTransaction,
};
