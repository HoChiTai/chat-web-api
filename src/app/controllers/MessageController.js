const messageModel = require('../models/MessageModel');

class MessageController {
  // [GET] /message
  index(req, res) {
    messageModel.getAllMessage(function (err, rows) {
      if (err) {
        res.json(err);
      }
      res.json(rows);
    });
  }
}

module.exports = new MessageController();
