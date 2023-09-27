import { Request, Response, NextFunction } from 'express';
import MessageModel from '../models/MessageModel';

class MessageController {
  // [GET] /message
  index(req: Request, res: Response, next: NextFunction) {
    MessageModel.getAllMessage(function (err: object, rows: object): void {
      if (err) {
        res.json(err);
      }
      res.json(rows);
    });
  }
}

export default new MessageController();
