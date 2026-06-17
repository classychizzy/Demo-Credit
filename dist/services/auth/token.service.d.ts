import jwt from "jsonwebtoken";
import { userPayload } from "../../types/userpayload";
export declare class TokenService {
    private readonly JWT_ACCESS_SECRET;
    private readonly JWT_REFRESH_SECRET;
    constructor();
    generateAccessToken(user: userPayload): string;
    generateRefreshToken(user: userPayload): string;
    verifyAccessToken(token: string): string | jwt.JwtPayload;
    verifyRefreshToken(token: string): string | jwt.JwtPayload;
}
//# sourceMappingURL=token.service.d.ts.map