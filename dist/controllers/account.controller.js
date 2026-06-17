"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const account_service_1 = require("../services/account/account.service");
class AccountController {
    constructor() {
        this.accountService = new account_service_1.AccountService();
    }
    async createAccountController(req, res) {
        try {
            const response = await this.accountService.createAccount(req.user.id, req.body);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
    async getMyAccountsController(req, res) {
        try {
            const response = await this.accountService.getMyAccounts(req.user.id);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
    async getAccountByNumberController(req, res) {
        try {
            const account_number = req.params['account_number'];
            const response = await this.accountService.getAccountByNumber(account_number);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map