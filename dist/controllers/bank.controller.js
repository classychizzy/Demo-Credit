"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankController = void 0;
const bank_service_1 = require("../services/bank/bank.service");
class BankController {
    constructor() {
        this.bankService = new bank_service_1.BankService();
        this.getBanks = (req, res) => {
            const banks = this.bankService.getAllBanks();
            res.status(200).json({
                success: true,
                message: "Banks retrieved successfully",
                data: banks,
            });
        };
        this.getBankById = (req, res) => {
            const bankId = req.params.id;
            if (!bankId || typeof bankId !== "string") {
                res.status(400).json({
                    success: false,
                    message: "Invalid bank ID",
                });
                return;
            }
            const bank = this.bankService.getBankById(bankId);
            if (!bank) {
                res.status(404).json({
                    success: false,
                    message: "Bank not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Bank retrieved successfully",
                data: bank,
            });
        };
        this.createBank = (req, res) => {
            const bank = this.bankService.createBank(req.body);
            res.status(201).json({
                success: true,
                message: "Bank created successfully",
                data: bank,
            });
        };
        this.deleteBank = (req, res) => {
            const bankId = req.params.id;
            if (!bankId || typeof bankId !== "string") {
                res.status(400).json({
                    success: false,
                    message: "Invalid bank ID",
                });
                return;
            }
            const deleted = this.bankService.deleteBank(bankId);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Bank not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Bank deleted successfully",
            });
        };
    }
}
exports.BankController = BankController;
//# sourceMappingURL=bank.controller.js.map