import { Axios } from "axios";
import { NodeBuffer } from "@virgilsecurity/data-utils";
const axios = new Axios({
    //transformResponse: res => JSON.parse(res as unknown as string),
    transformRequest: req => JSON.stringify(req),
    transitional: {
        silentJSONParsing: false
    },
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});
class KycController {
    async getKycStatus(req, res) {
        req.app.get('ws').send('Default backend socket: Backend requests to KYC Service');
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('kycPublicKey');
        const clientKey = req.app.get('clientPublicKey');
        axios.post('http://localhost:3004/get-kyc-status').then((value) => {
            req.app.get('ws').send('Default backend socket: Encrypted KYC response' + value.data.toString());
            const converted = JSON.parse(value.data);
            const decrypted = req.app.get('virgilCrypto').decryptThenVerify(NodeBuffer.from(converted.status, 'base64'), keys.privateKey, [keys.publicKey, publicKey]).toString('utf-8');
            req.app.get('ws').send('Default backend socket: Decrypted KYC response' + decrypted.toString());
            const response = req.app.get('virgilCrypto').signThenEncrypt(JSON.stringify(decrypted), keys.privateKey, clientKey).toString('base64');
            req.app.get('ws').send('Default backend socket: Re-encrypted KYC response' + response.toString());
            res.json({ data: response });
        });
    }
    async register(req, res) {
        req.app.get('ws').send('Default backend socket: Backend requests to KYC Service');
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('kycPublicKey');
        const clientKey = req.app.get('clientPublicKey');
        const decrypted = req.app.get('virgilCrypto').decryptThenVerify(NodeBuffer.from(req.body.info, 'base64'), keys.privateKey, [keys.publicKey, clientKey]).toString('utf-8');
        req.app.get('ws').send('Default backend socket: Decrypted register info' + decrypted);
        const encrypted = req.app.get('virgilCrypto').signThenEncrypt(decrypted, keys.privateKey, publicKey).toString('base64');
        req.app.get('ws').send('Default backend socket: encrypted register info' + encrypted);
        axios.post('http://localhost:3004/kyc', { info: encrypted }).then((value) => {
            req.app.get('ws').send('Default backend socket: Encrypted KYC response' + value.data);
            const converted = JSON.parse(value.data);
            const decrypted = req.app.get('virgilCrypto').decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), keys.privateKey, [keys.publicKey, publicKey]).toString('utf-8');
            req.app.get('ws').send('Default backend socket: Decrypted KYC response' + decrypted.toString());
            const response = req.app.get('virgilCrypto').signThenEncrypt(JSON.stringify(decrypted), keys.privateKey, clientKey).toString('base64');
            req.app.get('ws').send('Default backend socket: Re-encrypted KYC response' + response.toString());
            res.json({ status: response });
        });
    }
}
export default new KycController();
//# sourceMappingURL=kyc-controller.js.map