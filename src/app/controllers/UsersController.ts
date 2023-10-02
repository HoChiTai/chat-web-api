import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import 'dotenv/config';
import jwt, { JwtPayload, Secret, VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import RefreshTokenModel from '../models/RefreshTokenModel';

class UsersController {
  // [POST] /create
  create(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      if (data.username && data.password && data.name) {
        const salt = crypto.randomBytes(20).toString('hex');
        const hash = crypto.createHash('sha256');
        hash.update(data.password.concat(salt));
        data = {
          ...data,
          username: data.username.toLowerCase(),
          salt,
          password: hash.digest('hex'),
        };

        UsersModel.createUser(data, (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(201).json({ status: 'success', message: 'Create successfully' });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /create
  login(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      if (data.username && data.password) {
        UsersModel.getUserByUsername(data.username.toLowerCase(), (err, result) => {
          if (err) {
            res.status(400).json({ status: 'fail', message: 'Login failure' });
          } else if (result.length > 0) {
            const salt = result[0].salt;
            const hash = crypto.createHash('sha256');
            hash.update(data.password.concat(salt));
            if (hash.digest('hex') === result[0].password) {
              const accessToken = jwt.sign({ name: result[0].name }, process.env.ACCESS_TOKEN_SECRET as Secret, {
                expiresIn: '10s',
              });

              const refreshToken = jwt.sign({ name: result[0].name }, process.env.REFRESH_TOKEN_SECRET as Secret, {
                expiresIn: '7d',
              });

              RefreshTokenModel.createToken(refreshToken, (err, resu) => {
                if (err) {
                  res.status(400).json({ status: 'fail', message: 'Login failure' });
                } else {
                  res.status(200).json({
                    status: 'success',
                    message: 'Login successfully',
                    accessToken: 'Bearer ' + accessToken,
                    refreshToken: 'Bearer ' + refreshToken,
                    data: {
                      id: result[0].id,
                      name: result[0].name,
                      avatar: result[0].avatar,
                      email: result[0].email,
                      phone_number: result[0].phone,
                    },
                  });
                }
              });
            } else {
              res.status(400).json({ status: 'fail', message: 'Login failure' });
            }
          } else {
            res.status(400).json({ status: 'fail', message: 'Wrong username or password' });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /refreshToken
  refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = (req.headers['refresh-token'] as string) || '';
      token = token.split(' ')[1];
      if (!token) res.sendStatus(401);
      else {
        RefreshTokenModel.getTokenByToken(token, (err, result) => {
          if (err) res.sendStatus(401);
          if (result.length === 0) res.sendStatus(401);
          else {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret, (error, data) => {
              data = data as object;
              if (error) res.sendStatus(401);
              else {
                const accessToken = jwt.sign({ name: data.name }, process.env.ACCESS_TOKEN_SECRET as Secret, {
                  expiresIn: '10s',
                });
                res.status(200).json({
                  status: 'success',
                  message: 'Refresh token correctly',
                  accessToken: 'Bearer ' + accessToken,
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /search
  search(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.query;
      if (data.username && data.id) {
        const username: string = data.username as string;
        const id: string = data.id as string;

        UsersModel.getUserListByUsername(username.toLowerCase(), id, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json({ status: 'fail', message: 'Failure!' });
          } else {
            res.status(200).json({
              status: 'success',
              message: 'Get user list successfully',
              data: result,
            });
          }
        });
      } else {
        res.status(400).json({ status: 'fail', message: 'Failure!' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /Friends
  getFriends(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.query;
      if (data.id) {
        const id: string = data.id as string;

        UsersModel.getFriendsById(id, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json({ status: 'fail', message: 'Failure!' });
          } else {
            res.status(200).json({
              status: 'success',
              message: 'Get user list successfully',
              data: result,
            });
          }
        });
      } else {
        res.status(400).json({ status: 'fail', message: 'Failure!' });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UsersController();
