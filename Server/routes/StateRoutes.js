import express from 'express';
import { getStateByName, getCountDetails, getStateList } from '../controller/stateController.js';

const router = express.Router();

router.get('/name/:name', getStateByName);
router.get('/count', getCountDetails);
router.get('/list', getStateList);

export default router;