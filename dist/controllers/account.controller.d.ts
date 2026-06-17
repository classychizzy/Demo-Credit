import { Response, Request } from 'express';
import { AuthenticatedRequest } from '../types/express/authRequest';
export declare class AccountController {
    private accountService;
    constructor();
    createAccountController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getMyAccountsController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getAccountByNumberController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=account.controller.d.ts.map