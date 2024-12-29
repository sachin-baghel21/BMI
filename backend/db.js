// backend/db.js
const mysql = require('mysql');
const color = require('colors');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'bmi-db'  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database...'.green.bold);
});

// Export the connection to use in other files
module.exports = connection;
