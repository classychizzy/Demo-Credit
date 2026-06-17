"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("../utils/uuid");
const TABLE = 'refresh_tokens';
exports.RefreshTokenModel = {
    async create(tokenhash, expiredAt) {
        const id = (0, uuid_1.generateId)();
        const payload = {
            id,
            tokenhash,
            expired_at: expiredAt,
            revoked_at: null,
            created_at: new Date()
        };
        await (0, database_1.default)(TABLE).insert(payload);
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findById(id) {
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findByTokenHash(tokenhash) {
        return (0, database_1.default)(TABLE).where({ tokenhash }).first();
    },
    async revokeToken(id) {
        await (0, database_1.default)(TABLE).where({ id }).update({
            revoked_at: new Date()
        });
    },
    async isTokenValid(id) {
        const token = await (0, database_1.default)(TABLE).where({ id }).first();
        if (!token)
            return false;
        if (token.revoked_at)
            return false;
        if (new Date() > token.expired_at)
            return false;
        return true;
    },
    async deleteExpiredTokens() {
        await (0, database_1.default)(TABLE).where('expired_at', '<', new Date()).del();
    }
};
//# sourceMappingURL=refreshToken.model.js.map