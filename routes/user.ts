import express from 'express';
import { allUsers, login, signup } from '../controller';

const router = express.Router();

router.post('/create', signup);
router.post('/login', login);
router.get('/allUsers', allUsers);

export { router as UserRouter }
