import { Express } from 'express';
import messageRouter from './message';
import usersRouter from './users';

function routes(app: Express) {
  app.use('/api/users', usersRouter);
  app.use('/api/messages', messageRouter);
}

export default routes;
