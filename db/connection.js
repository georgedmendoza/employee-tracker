// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection(
{
  host: 'localhost',
  user: 'root',
  password: 'Happyhour123!',
  database: 'employee_tracker'
},
console.log('Connected to the employee tracker database.')
);

module.exports = db;