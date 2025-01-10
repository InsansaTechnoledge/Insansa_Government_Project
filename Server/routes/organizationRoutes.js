import express from "express";
import { getLogos,getOrganizations } from "../controller/organizationController.js";


const router = express.Router();

router.get('/logo', getLogos);
router.get('/:name', getOrganizations);


export default router;

