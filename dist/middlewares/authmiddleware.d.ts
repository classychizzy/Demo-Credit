import { AuthenticatedRequest } from "../types/express/authRequest";
import { NextFunction, Response } from "express";
import { ResponseDto } from "../Dto/response/response.dto";
export declare function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireKYC(req: AuthenticatedRequest, res: Response, next: NextFunction): ResponseDto<unknown> | undefined;
//# sourceMappingURL=authmiddleware.d.ts.map