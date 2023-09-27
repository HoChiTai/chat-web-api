import { Router } from 'express';
import MessageController from '../app/controllers/MessageController';

const router = Router();

router.get('/', MessageController.index);

export default router;
