"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import dotenv from 'dotenv';
// dotenv.config();
class TokenService {
    constructor() {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT secrets are not defined in environment variables");
        }
        this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign(user, this.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign(user, this.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.JWT_ACCESS_SECRET);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.JWT_REFRESH_SECRET);
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map