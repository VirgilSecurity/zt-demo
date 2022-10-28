import { Response, Request } from 'express';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { AccountDetails } from '../interfaces/account.interface.js';
import { Filter } from "../interfaces/filter.interface.js";
import { VirgilPrivateKey } from "virgil-crypto/dist/types/VirgilPrivateKey";
declare class MainRouterController {
    getNewPublicKey(req: Request<VirgilPrivateKey>, res: Response<VirgilPrivateKey>): Promise<void>;
    getProfileDetails(req: Request, res: Response<ProfileDetails>): Promise<void>;
    getAccountDetails(req: Request<{
        id: string;
    }>, res: Response<AccountDetails>): Promise<void>;
    getTransaction(req: Request<Filter>, res: Response<{
        id: string;
    }>): Promise<void>;
}
declare const _default: MainRouterController;
export default _default;
