"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const bank_1 = require("../../data/bank");
class BankService {
    constructor() {
        this.banks = bank_1.banks;
    }
    getAllBanks() {
        try {
            const response = {
                status_code: 200,
                success: true,
                message: "Banks retrieved successfully",
                data: this.banks,
            };
            return response;
        }
        catch (error) {
            const response = {
                status_code: 500,
                success: false,
                message: "Internal server error",
                error: error,
            };
            return response;
        }
    }
    getBankById(bankId) {
        return this.banks.find((bank) => bank.bankId === bankId);
    }
    createBank(bank) {
        this.banks.push(bank);
        return bank;
    }
    deleteBank(bankId) {
        const index = this.banks.findIndex((bank) => bank.bankId === bankId);
        if (index === -1) {
            return false;
        }
        this.banks.splice(index, 1);
        return true;
    }
}
exports.BankService = BankService;
//# sourceMappingURL=bank.service.js.map