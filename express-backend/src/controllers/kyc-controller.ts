import {
	Request,
	Response
} from 'express';
import { Axios } from "axios";
import { NodeBuffer } from "@virgilsecurity/data-utils";


const axios: Axios = new Axios({
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

	async getKycStatus(req: Request, res: Response) {
		req.app.get('ws').send('Backend requests to KYC Service ');
		const virgil = req.app.get('virgil');
		const keys = virgil.getKeys();
		axios.post('https://host.docker.internal:33434/get-kyc-status').then((value) => {
			req.app.get('ws').send('Encrypted KYC response ' +  value.data.toString());
			const converted = JSON.parse(value.data);
			const decrypted = virgil.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.status, 'base64'), keys.backendPrivate, [keys.backendPublic, keys.KYCPublic]).toString('utf-8');
			req.app.get('ws').send('Decrypted KYC response ' + decrypted.toString());
			res.json({data: decrypted});
		});
	}

	async register(req: Request, res: Response) {
		req.app.get('ws').send('Backend requests to KYC Service ');
		const virgil = req.app.get('virgil');
		const keys = virgil.getKeys();
		req.app.get('ws').send('Decrypted register info ' + req.body.data);
		const encrypted = virgil.virgilCrypto.signThenEncrypt(JSON.stringify(req.body.data), keys.backendPrivate, keys.KYCPublic).toString('base64');
		req.app.get('ws').send('encrypted register info ' + encrypted);
		axios.post('https://host.docker.internal:33434/kyc', {info : encrypted}).then((value) => {
			req.app.get('ws').send('Encrypted KYC response ' + value.data);
			const converted = JSON.parse(value.data);
			const decrypted = virgil.virgilCrypto.decryptThenVerify(NodeBuffer.from(converted.data, 'base64'), keys.backendPrivate, [keys.backendPublic, keys.KYCPublic]).toString('utf-8');
			req.app.get('ws').send('Decrypted KYC response ' + decrypted.toString());
			res.json({data: decrypted});
		});
	}

}

export default new KycController();
