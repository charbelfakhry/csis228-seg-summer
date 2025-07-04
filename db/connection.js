const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: '13.37.42.136',
    user: 'root',
    password: 'db@pass999',
    database: 'csis_279_seg_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306,
});

module.exports = pool;