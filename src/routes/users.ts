import { Router } from 'express';
import UsersController from '../app/controllers/UsersController';
import authenToken from '../app/middlewares/authenToken';

const router = Router();

router.post('/create', UsersController.create);
router.post('/login', UsersController.login);
router.post('/refreshToken', UsersController.refreshToken);
router.get('/search', UsersController.search);
router.get('/friends', UsersController.getFriends);

export default router;
