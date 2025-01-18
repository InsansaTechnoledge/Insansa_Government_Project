import express from 'express';
import { getStateByName } from '../controller/StateController.js';

const router = express.Router();

router.get('/:name', getStateByName);

export default router;