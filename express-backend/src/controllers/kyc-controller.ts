import {
	Request,
	Response
} from 'express';
import fetch from 'node-fetch';


class KycController {

	async getKycStatus(req: Request, res: Response) {
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
