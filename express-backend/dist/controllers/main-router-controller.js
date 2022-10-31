import { NodeBuffer } from "@virgilsecurity/data-utils";
class MainRouterController {
    async getNewPublicKey(req, res) {
        const key = req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
        req.app.set('clientPublicKey', key);
        const keys = req.app.get('keyPair');
        const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
        res.json({ key: response });
    }
    async getProfileDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const profileInfo = req.app.get('profileInfo');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(JSON.stringify(profileInfo), keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getAccountDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const accountDetails = req.app.get('accountDetails');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(JSON.stringify(accountDetails), keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getTransaction(req, res) {
        const vigrilSecurity = req.app.get('virgilCrypto');
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        const newTransaction = JSON.parse(vigrilSecurity
            .decryptThenVerify(NodeBuffer.from(req.body.info, 'base64'), keys.privateKey, [keys.publicKey, publicKey])
            .toString('utf-8'));
        let profileInfo = req.app.get('profileInfo');
        const currency = profileInfo.accounts.find((value) => value.currency === newTransaction.currency);
        const accountDetails = req.app.get('accountDetails');
        accountDetails.transactions.push({
            createdDate: createdDate(),
            amount: newTransaction.amount + '',
            type: +currency.balance - newTransaction.amount > 0 ? 'DEBIT' : 'CREDIT'
        });
        currency.balance = '' + (+currency.balance - newTransaction.amount);
        profileInfo = { ...profileInfo, ...currency };
        req.app.set('accountDetails', accountDetails);
        req.app.set('profileInfo', profileInfo);
        const response = vigrilSecurity
            .signThenEncrypt('{"id":"555-555-555-555"}', keys.privateKey, publicKey).toString('base64');
        return res.json({ data: response });
    }
}
function createdDate() {
    const date = new Date();
    const day = date.getDate() > 9 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 > 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() > 9 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() > 9 ? '0' + date.getMinutes() : date.getMinutes();
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}
export default new MainRouterController();
//# sourceMappingURL=main-router-controller.js.map