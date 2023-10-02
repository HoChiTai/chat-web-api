import db from '../../config/db';
import { queryCallback } from 'mysql';

type Message = {
  sender_id: number;
  receiver_id: number;
  group_id: number | string;
  content: string;
  type: string;
};

const MessageModel = {
  getDialog: function (
    sender_id: number,
    receiver_id: number | null | undefined,
    group_id: number | null | undefined,
    callback: queryCallback
  ) {
    console.log(group_id);
    return db.query(
      'Select * from messages where (sender_id = ? OR sender_id = ?) AND (receiver_id = ? OR receiver_id = ? OR group_id = ?)',
      [sender_id, receiver_id, sender_id, receiver_id, group_id],
      callback
    );
  },
  createMessage: function (data: Message, callback: queryCallback) {
    return db.query(
      `INSERT INTO messages(sender_id, receiver_id, group_id, content, type) VALUES (?,?,?,?,?)`,
      [data.sender_id, data.receiver_id, data.group_id, data.content, data.type],
      callback
    );
  },
};
export default MessageModel;
