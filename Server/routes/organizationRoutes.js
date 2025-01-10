import express from "express";
import { getLogos,getOrganization } from "../controller/organizationController.js";


const router = express.Router();

router.get('/logo', getLogos);
router.get('/:name', getOrganization);


export default router;

