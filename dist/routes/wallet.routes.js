"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("../controllers/wallet.controller");
const validate_Dto_1 = require("../middlewares/validate.Dto");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const fund_dto_1 = require("../Dto/wallet/fund.dto");
const transfer_dto_1 = require("../Dto/wallet/transfer.dto");
const withdraw_dto_1 = require("../Dto/wallet/withdraw.dto");
const router = (0, express_1.Router)();
const walletController = new wallet_controller_1.WalletController();
router.post('/fund', authmiddleware_1.authenticateToken, rateLimiter_1.fundRateLimiter, (0, validate_Dto_1.validateDto)(fund_dto_1.FundAccountDTO), walletController.fundAccountController.bind(walletController));
router.post('/transfer', authmiddleware_1.authenticateToken, rateLimiter_1.transferRateLimiter, (0, validate_Dto_1.validateDto)(transfer_dto_1.TransferDTO), walletController.transferFundsController.bind(walletController));
router.post('/withdraw', authmiddleware_1.authenticateToken, (0, validate_Dto_1.validateDto)(withdraw_dto_1.WithdrawDTO), walletController.withdrawFundsController.bind(walletController));
exports.default = router;
//# sourceMappingURL=wallet.routes.js.map