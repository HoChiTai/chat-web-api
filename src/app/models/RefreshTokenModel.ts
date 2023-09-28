import { queryCallback } from 'mysql';
import db from '../../config/db';

const RefreshTokenModel = {
  createToken: function (token: string, callback: queryCallback) {
    return db.query(`INSERT INTO refresh_token(token) VALUES (?)`, [token], callback);
  },
  getTokenByToken: function (token: string, callback: queryCallback) {
    return db.query(`SELECT * FROM refresh_token WHERE token = ?`, [token], callback);
  },
};
export default RefreshTokenModel;
