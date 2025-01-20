import express from 'express'
import { search, searchSuggestion } from '../controller/searchController.js';

const router = express.Router();

router.get('/:query', search );
router.get('/', searchSuggestion );

export default router;