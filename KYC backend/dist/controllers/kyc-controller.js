class KycController {
    async test(req, res) {
        req.app.get('ws').send('test');
        res.json('test');
    }
}
export default new KycController();
//# sourceMappingURL=kyc-controller.js.map