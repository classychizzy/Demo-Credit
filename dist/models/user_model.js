"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("../utils/uuid");
const TABLE = 'users';
exports.UserModel = {
    async create(data) {
        const id = (0, uuid_1.generateId)();
        const [user] = await (0, database_1.default)(TABLE).insert({ id, ...data });
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findByEmail(email) {
        return (0, database_1.default)(TABLE).where({ email }).first();
    },
    async findById(id) {
        return (0, database_1.default)(TABLE).where({ id }).first();
    },
    async findByPhoneNumber(phone_number) {
        return (0, database_1.default)(TABLE).where({ phone_number }).first();
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
//# sourceMappingURL=user_model.js.map