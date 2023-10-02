import { Request, Response, NextFunction } from 'express';
import MessageModel from '../models/MessageModel';

class MessageController {
  // [POST] /dialog
  dialog(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      if (data.sender_id && (data.receiver_id || data.group_id)) {
        MessageModel.getDialog(data.sender_id, data.receiver_id || null, data.group_id || null, (err, rows) => {
          if (err) {
            console.log(err);
            res.status(400).json({ status: 'fail', message: 'Failure!' });
          } else {
            res.status(200).json({
              status: 'success',
              message: 'Get dialog successfully',
              data: rows,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MessageController();
