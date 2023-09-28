import { queryCallback } from 'mysql';
import db from '../../config/db';

interface User {
  username: string;
  password: string;
  salt: string;
  name: string;
}

const UsersModel = {
  createUser: function (data: User, callback: queryCallback) {
    return db.query(
      `INSERT INTO users(username,password,salt,name) VALUES (?, ?, ?, ?)`,
      [data.username, data.password, data.salt, data.name],
      callback
    );
  },
  getUserByUsername: function (username: string, callback: queryCallback) {
    return db.query(`SELECT * FROM users WHERE username = ?`, [username], callback);
  },
};
export default UsersModel;
