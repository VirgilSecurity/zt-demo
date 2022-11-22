import { NodeBuffer } from '@virgilsecurity/data-utils';
import { ApplicationChartMocks, DevicesChartMocks, PolicesChartMocks, UsersChartMocks } from '../mocks/charMocks.js';
import { Axios } from 'axios';
class MainRouterController {
    async getNewPublicKey(req, res) {
        if (!req.body.key) {
            res.status(404);
            return res.json({ message: 'Error, no private key' });
        }
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
        const key = req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
        req.app.set('clientPublicKey', key);
        const keys = req.app.get('keyPair');
        const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
        axios.post('http://localhost:3004/login', { key: response }).then((value) => {
            const converted = JSON.parse(value.data);
            const anotherKey = req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(converted.key + '', 'base64'));
            req.app.set('kycPublicKey', anotherKey);
        });
        res.json({ key: response });
    }
    async getProfileDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        if (!publicKey) {
            res.status(404);
            return res.json({ message: 'Error, no private key' });
        }
        const profileInfo = req.app.get('profileInfo');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(JSON.stringify(profileInfo), keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getAccountDetails(req, res) {
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        if (!publicKey) {
            res.status(404);
            return res.json({ message: 'Error, no private key' });
        }
        const accountDetails = req.app.get('accountDetails');
        const response = req.app.get('virgilCrypto')
            .signThenEncrypt(JSON.stringify(accountDetails), keys.privateKey, publicKey).toString('base64');
        res.json({ data: response });
    }
    async getTransaction(req, res) {
        const vigrilSecurity = req.app.get('virgilCrypto');
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        if (!publicKey) {
            res.status(404);
            return res.json({ message: 'Error, no private key' });
        }
        const newTransaction = JSON.parse(vigrilSecurity
            .decryptThenVerify(NodeBuffer.from(req.body.info, 'base64'), keys.privateKey, [keys.publicKey, publicKey])
            .toString('utf-8'));
        const profileInfo = req.app.get('profileInfo');
        let flag = true;
        const accountDetails = req.app.get('accountDetails');
        profileInfo.accounts.forEach((value) => {
            if (value.currency === newTransaction.currency && +value.balance - newTransaction.amount > 0) {
                accountDetails.transactions.push({
                    createdDate: createdDate(),
                    amount: newTransaction.amount + '',
                    currency: newTransaction.currency,
                    type: 'DEBIT'
                });
                value.balance = '' + ((+value.balance - newTransaction.amount).toFixed(2));
                flag = false;
            }
        });
        req.app.set('accountDetails', accountDetails);
        req.app.set('profileInfo', profileInfo);
        if (flag) {
            res.status(404);
            const response = vigrilSecurity
                .signThenEncrypt('No such big money!', keys.privateKey, publicKey).toString('base64');
            return res.json({ data: response });
        }
        const response = vigrilSecurity
            .signThenEncrypt('{"id":"555-555-555-555"}', keys.privateKey, publicKey).toString('base64');
        return res.json({ data: response });
    }
    async chartData(req, res) {
        const vigrilSecurity = req.app.get('virgilCrypto');
        const keys = req.app.get('keyPair');
        const publicKey = req.app.get('clientPublicKey');
        if (!publicKey) {
            res.status(404);
            return res.json({ message: 'Error, no private key' });
        }
        const accountDetails = req.app.get('accountDetails');
        const applicationData = JSON.parse(ApplicationChartMocks);
        const policesData = JSON.parse(PolicesChartMocks);
        const usersData = JSON.parse(UsersChartMocks);
        const devicesData = JSON.parse(DevicesChartMocks);
        const dateArray = [];
        const transactionsData = [];
        accountDetails.transactions.forEach((value) => {
            if (dateArray.includes(value.createdDate)) {
                transactionsData.find((transaction) => transaction.createdDate === value.createdDate.split(' ')[0]).count++;
            }
            else {
                transactionsData.push({
                    createdDate: value.createdDate.split(' ')[0],
                    count: 1,
                });
                dateArray.push(value.createdDate);
            }
        });
        const collectedData = {
            application: applicationData,
            polices: policesData,
            users: usersData,
            devices: devicesData,
            transactions: transactionsData,
        };
        const response = vigrilSecurity
            .signThenEncrypt(JSON.stringify(collectedData), keys.privateKey, publicKey).toString('base64');
        res.send({ info: response });
    }
}
function createdDate() {
    const date = new Date();
    const day = +date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = +date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = +date.getFullYear();
    const hours = +date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = +date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}
export default new MainRouterController();
//# sourceMappingURL=main-router-controller.js.map