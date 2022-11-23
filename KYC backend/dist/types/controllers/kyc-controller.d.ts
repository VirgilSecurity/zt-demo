import { Request, Response } from 'express';
import { VirgilPrivateKey, VirgilPublicKey } from 'virgil-crypto';
declare class KycController {
    login(req: Request<{
        key: VirgilPublicKey;
    }>, res: Response<{
        key: VirgilPrivateKey;
    } | {
        message: string;
    }>): Promise<void>;
    getKycStatus(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
}
declare const _default: KycController;
export default _default;
