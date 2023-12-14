import { Request, Response } from 'express';
import { ProfileDetails } from '../interfaces/profile.interface.js';
import { AccountDetails } from '../interfaces/account.interface.js';
declare class MainRouterController {
    getProfileDetails(req: Request, res: Response<{
        data: ProfileDetails;
    } | {
        message: string;
    }>): Promise<void>;
    getAccountDetails(req: Request<{
        id: string;
    }>, res: Response<{
        data: AccountDetails;
    } | {
        message: string;
    }>): Promise<void>;
    getTransaction(req: Request<{
        data: string;
    }>, res: Response<{
        data: unknown;
    } | {
        message: string;
    }>): Promise<Response<{
        data: unknown;
    } | {
        message: string;
    }, Record<string, any>>>;
    chartData(req: Request, res: Response<{
        data: unknown;
    }>): Promise<void>;
}
declare const _default: MainRouterController;
export default _default;
