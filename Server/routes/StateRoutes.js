import express from 'express';
import { getStateByName,getCountDetails} from '../controller/StateController.js';

const router = express.Router();

router.get('/name/:name', getStateByName);
router.get('/count', getCountDetails);

export default router;