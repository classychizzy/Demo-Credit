"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("../utils/uuid");
const TABLE = 'transactions';
exports.TransactionModel = {
    async create(data) {
        const id = (0, uuid_1.generateId)();
        await (0, database_1.default)(TABLE).insert({ id, ...data });
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findById(id) {
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findByAccountId(account_id) {
        return (0, database_1.default)(TABLE).where({ account_id });
    },
    async findByReference(transaction_reference) {
        return (0, database_1.default)(TABLE).where({ transaction_reference }).first();
    },
    async findBySessionId(session_id) {
        return (0, database_1.default)(TABLE).where({ session_id }).first();
    },
    async update(id, data) {
        await (0, database_1.default)(TABLE)
            .where({ id })
            .update({ ...data, updated_at: new Date() });
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async delete(id) {
        await (0, database_1.default)(TABLE).where({ id }).delete();
    },
};
//# sourceMappingURL=transaction_model.js.map