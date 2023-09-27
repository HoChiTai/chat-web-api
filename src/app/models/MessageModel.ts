import db from '../../config/db';

const MessageModel = {
  getAllMessage: function (callback: (err: object, rows: object) => void) {
    return db.query('Select * from messages', callback);
  },
};
export default MessageModel;
