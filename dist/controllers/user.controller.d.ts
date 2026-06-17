import { Request, Response } from "express";
import { AuthenticatedRequest } from '../types/express/authRequest';
export declare class UserController {
    private userService;
    constructor();
    RegisterUserController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findUserByEmailController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPasswordController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    changePasswordController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPasswordController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokenController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logoutController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=user.controller.d.ts.map