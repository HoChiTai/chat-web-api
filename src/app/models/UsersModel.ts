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
    return db.query(`SELECT * FROM users WHERE username = ? AND is_del != 1`, [username], callback);
  },
  getUserListByUsername: function (username: string, id: string, callback: queryCallback) {
    return db.query(
      `SELECT id,email,avatar,name,phone_number FROM users WHERE name LIKE CONCAT( '%',?,'%') AND id != ? AND is_del != 1`,
      [username, id],
      callback
    );
  },
  getFriendsById: function (id: string, callback: queryCallback) {
    return db.query(
      `SELECT DISTINCT u.id,u.email,u.avatar,u.name,u.phone_number FROM users u, messages m WHERE (m.sender_id = ? OR m.receiver_id = ?) AND u.id != ? AND u.is_del = 0`,
      [id, id, id],
      callback
    );
  },
};
export default UsersModel;
