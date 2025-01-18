import express from 'express';
import {sendMail} from '../controller/ContactController.js'

const router = express.Router();

router.post('/sendMail', sendMail);

export default router;
