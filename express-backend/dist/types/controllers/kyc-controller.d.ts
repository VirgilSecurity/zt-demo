import { Request, Response } from 'express';
declare class KycController {
    getKycStatus(req: Request, res: Response): Promise<void>;
}
declare const _default: KycController;
export default _default;
