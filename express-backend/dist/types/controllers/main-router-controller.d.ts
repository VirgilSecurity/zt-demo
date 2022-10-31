import { Request, Response } from 'express';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { AccountDetails } from '../interfaces/account.interface.js';
import { VirgilPrivateKey } from "virgil-crypto/dist/types/VirgilPrivateKey";
declare class MainRouterController {
    getNewPublicKey(req: Request<{
        key: VirgilPrivateKey;
    }>, res: Response<{
        key: VirgilPrivateKey;
    }>): Promise<void>;
    getProfileDetails(req: Request, res: Response<{
        data: ProfileDetails;
    }>): Promise<void>;
    getAccountDetails(req: Request<{
        id: string;
    }>, res: Response<{
        data: AccountDetails;
    }>): Promise<void>;
    getTransaction(req: Request<{
        info: string;
    }>, res: Response<{
        data: {
            id: string;
        };
    }>): Promise<Response<{
        data: {
            id: string;
        };
    }, Record<string, any>>>;
}
declare const _default: MainRouterController;
export default _default;
