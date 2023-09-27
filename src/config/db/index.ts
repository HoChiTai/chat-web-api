import mysql from 'mysql';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-web',
});

export default connection;
