import { v4 as uuid } from 'uuid';
import { ProfileDetailsMocks } from '../mocks/profileDetailsMocks.js';
import { AccountDetailsMocks } from '../mocks/accountDetailsMocks.js';
class MainRouterController {
    async getNewPublicKey(req, res) {
        res.json({ publicKey: uuid() });
    }
    async getProfileDetails(req, res) {
        res.json(ProfileDetailsMocks);
    }
    async getAccountDetails(req, res) {
        res.json(AccountDetailsMocks);
    }
    async getTransaction(req, res) {
        res.json({ id: "555-555-555-555" });
    }
}
export default new MainRouterController();
//# sourceMappingURL=main-router-controller.js.map