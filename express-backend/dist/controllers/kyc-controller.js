import fetch from 'node-fetch';
class KycController {
    async getKycStatus(req, res) {
        req.app.get('ws').send('Backend requests to KYC Service');
        await fetch('http://localhost:3004/get-kyc-status', {
            method: 'POST',
        }).then((value) => {
            value.json().then((test) => {
                console.log(test);
            });
        });
    }
}
export default new KycController();
//# sourceMappingURL=kyc-controller.js.map