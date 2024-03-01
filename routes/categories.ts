import express, {Request, Response} from "express"
import { categoryIndex, saveCategory,getCategory, updateCategory, deleteCategory } from "../controller"
import { checkAuth } from "../middleware/check-auth";
const router = express.Router()

router.get('/', categoryIndex);
router.post('/',checkAuth, saveCategory);
router.get('/:id', getCategory);
router.put('/:id',checkAuth, updateCategory);
router.delete('/:id',checkAuth, deleteCategory);

export { router as CategoryRouter }