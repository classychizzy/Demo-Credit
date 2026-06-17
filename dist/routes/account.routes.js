"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const validate_Dto_1 = require("../middlewares/validate.Dto");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const createAccount_request_dto_1 = require("../Dto/account/createAccount.request.dto");
const router = (0, express_1.Router)();
const accountController = new account_controller_1.AccountController();
router.post('/', authmiddleware_1.authenticateToken, (0, validate_Dto_1.validateDto)(createAccount_request_dto_1.CreateAccountRequestDTO), accountController.createAccountController.bind(accountController));
router.get('/me', authmiddleware_1.authenticateToken, accountController.getMyAccountsController.bind(accountController));
router.get('/:account_number', authmiddleware_1.authenticateToken, accountController.getAccountByNumberController.bind(accountController));
exports.default = router;
//# sourceMappingURL=account.routes.js.map