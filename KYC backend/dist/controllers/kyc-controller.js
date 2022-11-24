import { NodeBuffer } from '@virgilsecurity/data-utils';
import { NotVerifyStatus, PendingVerifyStatus, VerifiedStatus } from '../mocks/statusMock.js';
class KycController {
    async login(req, res) {
        const key = req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
        req.app.set('clientPublicKey', key);
        const keys = req.app.get('keyPair');
        const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
        res.json({ key: response });
    }
    async getKycStatus(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const sendStatus = req.app.get('isLogged') ? VerifiedStatus : req.app.get('isTimeout') ? PendingVerifyStatus : NotVerifyStatus;
        req.app.get('ws').send('Started KYC status' + sendStatus);
        const response = req.app.get('virgilCrypto').signThenEncrypt(JSON.stringify(sendStatus), keys.privateKey, publicKey).toString('base64');
        req.app.get('ws').send('Send encrypted KYC Status to antoher backend ' + response);
        res.json({ status: response });
    }
    async register(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const converted = req.app.get('virgilCrypto').decryptThenVerify(NodeBuffer.from(req.body.info, 'base64'), keys.privateKey, [keys.publicKey, publicKey]).toString('utf-8');
        req.app.get('ws').send('decrypted status info on KYC backend ' + converted);
        req.app.set('isTimeout', true);
        setTimeout(() => {
            req.app.set('isLogged', true);
            req.app.set('isTimeout', false);
        }, 10000);
        req.app.get('ws').send('Before encryption KYC status ' + JSON.stringify(PendingVerifyStatus));
        const response = req.app.get('virgilCrypto').signThenEncrypt(JSON.stringify(PendingVerifyStatus), keys.privateKey, publicKey).toString('base64');
        req.app.get('ws').send('Send encrypted new KYC status ' + response);
        res.json({ data: response });
    }
}
export default new KycController();
//# sourceMappingURL=kyc-controller.js.map