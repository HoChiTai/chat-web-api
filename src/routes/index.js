const messageRouter = require('./message');

function routes(app) {
  app.use('/message', messageRouter);
  app.use('/', (req, res) => res.send('hello'));
}

module.exports = routes;
