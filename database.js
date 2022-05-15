const mysql = require('mysql2');

// Create connection to database
let connection = mysql.createConnection({
    host: process.env.DB_HOST,              // public IP of instance
    user: process.env.DB_USER,              // name of created user 
    database: process.env.DB_DATABASE,      // name of created database (i.e. 'loginDB')
    password: process.env.DB_PASS           // password of created user
});

// Connect to database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to DB: ' + error.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);

    // Create Users table in the database
    let createTable = 
    `CREATE TABLE IF NOT EXISTS Users(
        id int auto_increment primary key,
        email varchar(225) not null,
        username varchar(255) not null,
        password varchar(255) not null
    );`
    connection.query(createTable, (error) => {
        if (error) throw error
        console.log("Users table created successfully!");
    })
})

module.exports = connection;