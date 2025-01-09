import express from "express";
import { getLogos } from "../controller/organisationController.js";


const router = express.Router();

router.get('/logo', getLogos);


export default router;

