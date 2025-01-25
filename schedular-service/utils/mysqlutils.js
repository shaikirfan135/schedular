const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'hafsa',
    database: 'cts'
})

conn.connect((error) => {
    if(error) {
        console.error('Connection error : ' +error);
    } else {
        console.log('Connection successful.');
    }
})

module.exports=conn;