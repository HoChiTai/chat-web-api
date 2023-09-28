import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt, { Secret } from 'jsonwebtoken';

export default function authenToken(req: Request, res: Response, next: NextFunction) {
  let token = (req.headers['access-token'] as string) || '';
  token = token.split(' ')[1];
  if (!token) res.sendStatus(401);
  else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, data) => {
      if (err) res.sendStatus(403);
      else next();
    });
  }
}
