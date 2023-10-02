import { Router } from 'express';
import MessageController from '../app/controllers/MessageController';

const router = Router();

router.post('/dialog', MessageController.dialog);

export default router;
