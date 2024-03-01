import express, {Request, Response} from "express"
import {destroy, index, save, show, update} from "../controller"
import { checkAuth } from "../middleware/check-auth";

const router = express.Router()

router.get('/', index);
router.post('/', checkAuth, save);
router.get('/:id', show);
router.put('/:id', checkAuth, update);
router.delete('/:id', checkAuth, destroy);

export { router as postRouter }