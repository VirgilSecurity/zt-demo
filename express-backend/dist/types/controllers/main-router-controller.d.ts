import { Request, Response } from 'express';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { AccountDetails } from '../interfaces/account.interface.js';
import { VirgilPrivateKey } from "virgil-crypto/dist/types/VirgilPrivateKey";
declare class MainRouterController {
    getNewPublicKey(req: Request<{
        key: VirgilPrivateKey;
    }>, res: Response<{
        key: VirgilPrivateKey;
    } | {
        message: string;
    }>): Promise<Response<{
        key: VirgilPrivateKey;
    } | {
        message: string;
    }, Record<string, any>> | undefined>;
    getProfileDetails(req: Request, res: Response<{
        data: ProfileDetails;
    } | {
        message: string;
    }>): Promise<Response<{
        data: ProfileDetails;
    } | {
        message: string;
    }, Record<string, any>> | undefined>;
    getAccountDetails(req: Request<{
        id: string;
    }>, res: Response<{
        data: AccountDetails;
    } | {
        message: string;
    }>): Promise<Response<{
        data: AccountDetails;
    } | {
        message: string;
    }, Record<string, any>> | undefined>;
    getTransaction(req: Request<{
        info: string;
    }>, res: Response<{
        data: {
            id: string;
        };
    } | {
        message: string;
    }>): Promise<Response<{
        data: {
            id: string;
        };
    } | {
        message: string;
    }, Record<string, any>>>;
    chartData(req: Request, res: Response<{
        info: string;
    } | {
        message: string;
    }>): Promise<Response<{
        info: string;
    } | {
        message: string;
    }, Record<string, any>> | undefined>;
}
declare const _default: MainRouterController;
export default _default;
