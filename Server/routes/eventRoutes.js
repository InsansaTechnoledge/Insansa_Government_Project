import express from 'express'
import { getLatestUpdates } from '../controller/eventController.js';

const router = express.Router();

router.get('/latest', getLatestUpdates)

export default router;