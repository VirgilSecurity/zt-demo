import {
	Request,
	Response
} from 'express';
import {
	VirgilPrivateKey,
	VirgilPublicKey
} from 'virgil-crypto';
import { NodeBuffer } from '@virgilsecurity/data-utils';

class KycController {

	async login(req: Request<{key: VirgilPublicKey}>, res: Response<{key: VirgilPrivateKey} | {message: string}>) {
		const key =  req.app.get('virgilCrypto').importPublicKey(NodeBuffer.from(req.body.key, 'base64'));
		req.app.set('clientPublicKey', key);
		const keys = req.app.get('keyPair');
		const response = req.app.get('virgilCrypto').exportPublicKey(keys.publicKey).toString('base64');
		res.json({key: response});
	}

	async getKycStatus(req: Request, res:Response) {
		req.app.get('ws').send('test');
	}
}


export default new KycController();
