import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express/authRequest';
export declare class WalletController {
    private walletService;
    constructor();
    fundAccountController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    transferFundsController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    withdrawFundsController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=wallet.controller.d.ts.map