import express from 'express';
import { getCategories, getCategory } from '../controller/categoryController.js';

const router = express.Router();

router.get('/getCategories', getCategories);
router.get('/:name', getCategory);

export default router;
