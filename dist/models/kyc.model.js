"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("../utils/uuid");
const TABLE = 'kyc';
exports.KYCModel = {
    async create(data) {
        const id = (0, uuid_1.generateId)();
        await (0, database_1.default)(TABLE).insert({
            id,
            ...data,
            bvn_verified: false,
            kyc_status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
        });
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findByUserId(user_id) {
        return (0, database_1.default)(TABLE).where({ user_id }).first();
    },
    async updateStatus(user_id, kyc_status, rejection_reason) {
        return (0, database_1.default)(TABLE)
            .where({ user_id })
            .update({
            kyc_status,
            rejection_reason: kyc_status === "failed"
                ? rejection_reason
                : null,
            updated_at: new Date(),
        });
        ;
    },
    async updateKYC(user_id, data) {
        return (0, database_1.default)(TABLE).where({ user_id }).update({
            ...data,
            updated_at: new Date(),
        });
    },
};
//# sourceMappingURL=kyc.model.js.map