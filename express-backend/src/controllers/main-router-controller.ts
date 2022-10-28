import {
	Response,
	Request
} from 'express';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { ProfileDetailsMocks } from '../mocks/profileDetailsMocks.js';
import { AccountDetails } from '../interfaces/account.interface.js';
import { AccountDetailsMocks } from '../mocks/accountDetailsMocks.js';
import { Filter } from "../interfaces/filter.interface.js";
import { VirgilPrivateKey } from "virgil-crypto/dist/types/VirgilPrivateKey";


class MainRouterController {

	async getNewPublicKey(req: Request<VirgilPrivateKey>, res: Response<VirgilPrivateKey>) {
		const key =  req.app.get('virgilCrypto').importPublicKey(Buffer.from(req.body, 'base64'));
		req.app.set('clientPublicKey', key);
		const keys = req.app.get('keyPair');
		const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey);
		res.json(response);
	}

	async getProfileDetails(req: Request, res: Response<ProfileDetails>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt(Buffer.from(ProfileDetailsMocks, 'utf-8'), keys.privateKey, publicKey)
		res.json(response);
	}

	async getAccountDetails(req: Request<{id: string}>, res: Response<AccountDetails>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt(Buffer.from(AccountDetailsMocks, 'utf-8'), keys.privateKey, publicKey)
		res.json(response);
	}

	async getTransaction(req: Request<Filter>, res: Response<{id: string}>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt(Buffer.from('{"id": "555-555-555-555"}', 'utf-8'), keys.privateKey, publicKey)
		res.json(response);
	}
}


export default new MainRouterController();
