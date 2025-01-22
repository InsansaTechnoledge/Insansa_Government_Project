import express from 'express';
import { create, subscribeMail } from '../controller/subscriberController.js'

const router=express.Router();

router.post('/create',create);

export default router;