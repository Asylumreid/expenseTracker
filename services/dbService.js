const config = require('../config/config');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: config.db_host,
    user: config.user,
    password: config.pass,
    database: config.db_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// async function query(sql, params) {

    // pool.query(sql,params, function(result, err){
    //     if(err){
    //         throw new Error(err);
    //     } 
    //     return result;
    // })

    // pool.getConnection((err, conn) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     conn.execute(sql, params, function (results, err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         return results;
    //     });
    // });
// }

module.exports = pool;
