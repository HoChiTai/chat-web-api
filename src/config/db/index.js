const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-web',
});
console.log('Connect successfully!');

module.exports = connection;
