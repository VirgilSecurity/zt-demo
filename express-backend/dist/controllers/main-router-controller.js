import { ProfileDetailsMocks } from '../mocks/profileDetailsMocks.js';
import { AccountDetailsMocks } from '../mocks/accountDetailsMocks.js';
class MainRouterController {
    async getNewPublicKey(req, res) {
        const key = req.app.get('virgilCrypto').importPublicKey(Buffer.from(req.body, 'base64'));
        req.app.set('clientPublicKey', key);
        const keys = req.app.get('keyPair');
        const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey);
        res.json(response);
    }
    async getProfileDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(Buffer.from(ProfileDetailsMocks, 'utf-8'), keys.privateKey, publicKey);
        res.json(response);
    }
    async getAccountDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(Buffer.from(AccountDetailsMocks, 'utf-8'), keys.privateKey, publicKey);
        res.json(response);
    }
    async getTransaction(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(Buffer.from('{"id": "555-555-555-555"}', 'utf-8'), keys.privateKey, publicKey);
        res.json(response);
    }
}
export default new MainRouterController();
//# sourceMappingURL=main-router-controller.js.map