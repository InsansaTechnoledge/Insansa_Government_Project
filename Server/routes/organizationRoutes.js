import express from "express";
import { getCentralLogos,getOrganization } from "../controller/organizationController.js";


const router = express.Router();

router.get('/logo', getCentralLogos);
router.get('/:name', getOrganization);


export default router;

