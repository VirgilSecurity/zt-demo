import { Router } from "express";
import KycController from "../controllers/kyc-controller.js";


const router = Router();


router.post('/get-kyc-status', KycController.test);


export default router;
