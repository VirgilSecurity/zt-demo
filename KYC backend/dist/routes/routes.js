import { Router } from 'express';
import KycController from '../controllers/kyc-controller.js';
const router = Router();
router.post('/login', KycController.login);
router.post('/get-kyc-status', KycController.getKycStatus);
router.post('/kyc', KycController.register);
export default router;
//# sourceMappingURL=routes.js.map