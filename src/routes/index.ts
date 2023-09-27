import { Express } from 'express';
import messageRouter from './message';

function routes(app: Express) {
  app.use('/api/message', messageRouter);
}

export default routes;
