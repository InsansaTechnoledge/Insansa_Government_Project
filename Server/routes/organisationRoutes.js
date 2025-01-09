import express from "express";
import { getLogos } from "../controller/organisationController";


const router = express.Router();

router.get('/logo', getLogos);


export default router;

