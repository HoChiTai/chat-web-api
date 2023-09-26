const db = require('../../config/db');

const MessageModel = {
  getAllMessage: function (callback) {
    return db.query('Select * from messages', callback);
  },
};
module.exports = MessageModel;
