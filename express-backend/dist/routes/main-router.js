import { Router } from 'express';
import MainRouterController from '../controllers/main-router-controller.js';
const mainRouter = Router();
mainRouter.post('/login', MainRouterController.getNewPublicKey);
mainRouter.post('/get-profile-details', MainRouterController.getProfileDetails);
mainRouter.post('/get-account-details', MainRouterController.getAccountDetails);
mainRouter.post('/transaction', MainRouterController.getTransaction);
mainRouter.post('/charts', MainRouterController.chartData);
export default mainRouter;
//# sourceMappingURL=main-router.js.map