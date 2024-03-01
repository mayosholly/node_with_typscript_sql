import express from 'express';
import { upload } from '../helper/image-uploader';
import { uploadController } from '../controller/imageController';
import { checkAuth } from '../middleware/check-auth';

const router = express.Router();

router.post('/', checkAuth, upload.single('image'), uploadController);

export { router as ImageRouter }
