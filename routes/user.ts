import express from 'express';
import { login, signup } from '../controller';

const router = express.Router();

router.post('/create', signup);
router.post('/login', login);

export { router as UserRouter }
