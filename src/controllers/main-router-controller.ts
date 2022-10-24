import {
	Response,
	Request
} from 'express';
import { PublicKey } from '../interfaces/keys.interface.js';
import { v4 as uuid } from 'uuid';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { ProfileDetailsMocks } from '../mocks/profileDetailsMocks.js';
import { AccountDetails } from '../interfaces/account.interface.js';
import { AccountDetailsMocks } from '../mocks/accountDetailsMocks.js';


class MainRouterController {

	async getNewPublicKey(req: Request<PublicKey>, res: Response<PublicKey>) {
		res.json({publicKey: uuid()});
	}

	async getProfileDetails(req: Request, res: Response<ProfileDetails>) {
		res.json(ProfileDetailsMocks);
	}

	async getAccountDetails(req: Request<{id: string}>, res: Response<AccountDetails>) {
		res.json(AccountDetailsMocks);
	}
}


export default new MainRouterController();
