import { ProfileDetailsMocks } from '../mocks/profileDetailsMocks.js';
import { AccountDetailsMocks } from '../mocks/accountDetailsMocks.js';
import { NodeBuffer } from "@virgilsecurity/data-utils";
class MainRouterController {
    async getNewPublicKey(req, res) {
        console.log(req.body);
        const key = req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
        req.app.set('clientPublicKey', key);
        const keys = req.app.get('keyPair');
        const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
        res.json({ key: response });
    }
    async getProfileDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(ProfileDetailsMocks, keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getAccountDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(AccountDetailsMocks, keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getTransaction(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt('{"id":"555-555-555-555"}', keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
}
export default new MainRouterController();
//# sourceMappingURL=main-router-controller.js.map