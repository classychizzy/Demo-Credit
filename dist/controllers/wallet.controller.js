"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const wallet_service_1 = require("../services/wallet/wallet.service");
class WalletController {
    constructor() {
        this.walletService = new wallet_service_1.WalletService();
    }
    async fundAccountController(req, res) {
        try {
            const data = req.body;
            const response = await this.walletService.fundAccount(req.user.id, data);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: error.message || 'Internal server error',
            });
        }
    }
    async transferFundsController(req, res) {
        try {
            const data = req.body;
            const response = await this.walletService.transferFunds(req.user.id, data);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: error.message || 'Internal server error',
            });
        }
    }
    async withdrawFundsController(req, res) {
        try {
            const data = req.body;
            const response = await this.walletService.withdrawFunds(req.user.id, data);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: error.message || 'Internal server error',
            });
        }
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map