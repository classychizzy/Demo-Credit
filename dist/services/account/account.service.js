"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const account_model_1 = require("../../models/account.model");
const user_model_1 = require("../../models/user.model");
function generateAccountNumber() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
}
class AccountService {
    constructor() {
        this.accountModel = account_model_1.AccountModel;
        this.userModel = user_model_1.UserModel;
    }
    async createAccount(userId, data) {
        let account_number;
        let isUnique = false;
        const user = await user_model_1.UserModel.findById(userId);
        if (!user) {
            const response = {
                status_code: 404,
                success: false,
                message: 'User not found',
            };
            return response;
        }
        const accountName = `${user.first_name} ${user.last_name}`.toUpperCase();
        // Ensure the generated number is not already taken
        do {
            account_number = generateAccountNumber();
            const taken = await account_model_1.AccountModel.findByAccountNumber(account_number);
            isUnique = !taken;
        } while (!isUnique);
        const payload = {
            id: '',
            user_id: userId,
            account_type: data.account_type,
            account_number,
            account_name: accountName,
            account_dir: 'credit',
            account_balance: 0,
            account_status: 'active',
            created_at: new Date(),
            updated_at: new Date(),
        };
        const account = await account_model_1.AccountModel.create(payload);
        return { status_code: 201, success: true, message: 'Account created successfully', data: account };
    }
    async getMyAccounts(userId) {
        const accounts = await account_model_1.AccountModel.findByUserId(userId);
        if (!accounts || accounts.length === 0) {
            return { status_code: 404, success: false, message: 'No accounts found' };
        }
        return { status_code: 200, success: true, message: 'Accounts retrieved successfully', data: accounts };
    }
    async getAccountByNumber(accountNumber) {
        const account = await account_model_1.AccountModel.findByAccountNumber(accountNumber);
        if (!account) {
            return { status_code: 404, success: false, message: 'Account not found' };
        }
        return { status_code: 200, success: true, message: 'Account retrieved successfully', data: account };
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map