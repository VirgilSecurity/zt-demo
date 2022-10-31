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
import {
	dataToUint8Array,
	NodeBuffer
} from "@virgilsecurity/data-utils";


class MainRouterController {

	async getNewPublicKey(req: Request<{key: VirgilPrivateKey}>, res: Response<{key: VirgilPrivateKey}>) {
		console.log(req.body);
		const key =  req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
		req.app.set('clientPublicKey', key);
		const keys = req.app.get('keyPair');
		const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
		res.json({key: response});
	}

	async getProfileDetails(req: Request, res: Response<{data: ProfileDetails}>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt(ProfileDetailsMocks, keys.privateKey, publicKey).toString('base64')
		res.json({data: response});
	}

	async getAccountDetails(req: Request<{id: string}>, res: Response<{data: AccountDetails}>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt(AccountDetailsMocks, keys.privateKey, publicKey).toString('base64')
		res.json({data: response});
	}

	async getTransaction(req: Request<{info: string}>, res: Response<{data: {id: string}}>) {
		const keys = req.app.get('keyPair');
		const publicKey = req.app.get('clientPublicKey');
		const response = req.app.get('virgilCrypto')
			.signThenEncrypt('{"id":"555-555-555-555"}', keys.privateKey, publicKey).toString('base64')
		res.json({ data: response } );
	}
}


export default new MainRouterController();
