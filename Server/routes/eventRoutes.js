import express from 'express'
import { getEvent, getLatestUpdates } from '../controller/eventController.js';

const router = express.Router();

router.get('/latest', getLatestUpdates)
router.get('/:eventId' ,getEvent);

export default router;