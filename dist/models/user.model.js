"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
//import { CreateUserDTO } from '../Dto/user/RegisterUser.dto
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("../utils/uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const TABLE = 'users';
exports.UserModel = {
    async create(data) {
        const id = (0, uuid_1.generateId)();
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPassword;
        await (0, database_1.default)(TABLE).insert({ id, ...data });
        return (0, database_1.default)(TABLE)
            .where({ id })
            .select('email', 'id', 'first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'is_active');
    },
    async findAll() {
        return (0, database_1.default)(TABLE).select();
    },
    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt_1.default.compare(plainPassword, hashedPassword);
    },
    async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        return (0, database_1.default)('users').where({ id }).update({
            password: hashedPassword,
            updated_at: new Date()
        });
    },
    async setResetToken(email) {
        const user = await (0, database_1.default)(TABLE).where({ email }).first();
        if (!user)
            throw new Error('User with this email does not exist');
        const reset_token = crypto_1.default.randomBytes(32).toString('hex'); // random token
        const reset_token_expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
        await (0, database_1.default)(TABLE).where({ email }).update({
            reset_token,
            reset_token_expires_at,
            updated_at: new Date()
        });
        return { reset_token, reset_token_expires_at };
    },
    async resetPassword(token, newPassword) {
        // find user by token and check it hasn't expired
        const user = await (0, database_1.default)(TABLE)
            .where({ reset_token: token })
            .andWhere('reset_token_expires_at', '>', new Date()) // not expired
            .first();
        if (!user)
            throw new Error('Invalid or expired reset token');
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await (0, database_1.default)(TABLE).where({ id: user.id }).update({
            password: hashedPassword,
            reset_token: null, // clear token after use
            reset_token_expires_at: null,
            updated_at: new Date()
        });
    },
    async changePassword(id, oldPassword, newPassword) {
        const user = await (0, database_1.default)(TABLE).where({ id }).first();
        if (!user)
            throw new Error('User not found');
        const isMatch = await bcrypt_1.default.compare(oldPassword, user.password);
        if (!isMatch)
            throw new Error('Old password is incorrect');
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await (0, database_1.default)(TABLE).where({ id }).update({
            password: hashedPassword,
            updated_at: new Date()
        });
    },
    async findByEmail(email) {
        return (0, database_1.default)(TABLE)
            .where({ email })
            .first()
            .select('email', 'id', 'first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'password', 'is_active');
    },
    async findById(id) {
        return (0, database_1.default)(TABLE)
            .where({ id })
            .first()
            .select('email', 'id', 'first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'is_active');
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
    }
};
//# sourceMappingURL=user.model.js.map