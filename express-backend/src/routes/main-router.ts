import { Router } from 'express';
import MainRouterController from '../controllers/main-router-controller.js';
import KycController from '../controllers/kyc-controller.js';

const mainRouter = Router();

// mainRouter.post('/login', MainRouterController.getNewPublicKey);
mainRouter.post('/get-profile-details', MainRouterController.getProfileDetails);
mainRouter.post('/get-account-details', MainRouterController.getAccountDetails);
mainRouter.post('/transaction', MainRouterController.getTransaction);
mainRouter.post('/charts', MainRouterController.chartData);
mainRouter.post('/get-kyc-status', KycController.getKycStatus);
mainRouter.post('/kyc', KycController.register);

export default mainRouter;
