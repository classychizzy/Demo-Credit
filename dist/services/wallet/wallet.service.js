"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const account_model_1 = require("../../models/account.model");
const uuid_1 = require("../../utils/uuid");
const transaction_1 = require("../../utils/transaction");
const database_1 = __importDefault(require("../../config/database"));
const BANK_NAME = 'DemoCredit';
class WalletService {
    async fundAccount(userId, data) {
        const account = await account_model_1.AccountModel.findByAccountNumber(data.account_number);
        if (!account) {
            return { status_code: 404, success: false, message: 'Account not found' };
        }
        if (account.user_id !== userId) {
            return { status_code: 403, success: false, message: 'Access denied' };
        }
        if (account.account_status !== 'active') {
            return { status_code: 400, success: false, message: 'Account is not active' };
        }
        await database_1.default.transaction(async (trx) => {
            const newBalance = Number(account.account_balance) + data.amount;
            await trx('accounts')
                .where({ id: account.id })
                .update({ account_balance: newBalance, account_dir: 'credit', updated_at: new Date() });
            await trx('transactions').insert({
                id: (0, uuid_1.generateId)(),
                account_id: account.id,
                transaction_type: 'self',
                beneficiary_name: account.account_name,
                beneficiary_account_number: account.account_number,
                beneficiary_bank: BANK_NAME,
                session_id: (0, transaction_1.generateSessionId)(),
                transaction_reference: (0, transaction_1.generateTransactionRef)(),
                transaction_charges: 0,
                transaction_amount: data.amount,
                is_inflow: true,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        const updatedAccount = await account_model_1.AccountModel.findByAccountNumber(data.account_number);
        return {
            status_code: 200,
            success: true,
            message: 'Account funded successfully',
            data: updatedAccount,
        };
    }
    async transferFunds(userId, data) {
        if (data.source_account_number === data.destination_account_number) {
            return { status_code: 400, success: false, message: 'Cannot transfer to the same account' };
        }
        const sourceAccount = await account_model_1.AccountModel.findByAccountNumber(data.source_account_number);
        if (!sourceAccount) {
            return { status_code: 404, success: false, message: 'Source account not found' };
        }
        if (sourceAccount.user_id !== userId) {
            return { status_code: 403, success: false, message: 'Access denied' };
        }
        if (sourceAccount.account_status !== 'active') {
            return { status_code: 400, success: false, message: 'Source account is not active' };
        }
        if (Number(sourceAccount.account_balance) < data.amount) {
            return { status_code: 400, success: false, message: 'Insufficient funds' };
        }
        const destinationAccount = await account_model_1.AccountModel.findByAccountNumber(data.destination_account_number);
        if (!destinationAccount) {
            return { status_code: 404, success: false, message: 'Destination account not found' };
        }
        if (destinationAccount.account_status !== 'active') {
            return { status_code: 400, success: false, message: 'Destination account is not active' };
        }
        await database_1.default.transaction(async (trx) => {
            const newSourceBalance = Number(sourceAccount.account_balance) - data.amount;
            const newDestinationBalance = Number(destinationAccount.account_balance) + data.amount;
            const sessionId = (0, transaction_1.generateSessionId)();
            const now = new Date();
            await trx('accounts')
                .where({ id: sourceAccount.id })
                .update({ account_balance: newSourceBalance, account_dir: 'debit', updated_at: now });
            await trx('accounts')
                .where({ id: destinationAccount.id })
                .update({ account_balance: newDestinationBalance, account_dir: 'credit', updated_at: now });
            await trx('transactions').insert({
                id: (0, uuid_1.generateId)(),
                account_id: sourceAccount.id,
                transaction_type: 'intrabank',
                beneficiary_name: destinationAccount.account_name,
                beneficiary_account_number: destinationAccount.account_number,
                beneficiary_bank: BANK_NAME,
                session_id: sessionId,
                transaction_reference: (0, transaction_1.generateTransactionRef)(),
                transaction_charges: 0,
                transaction_amount: data.amount,
                is_inflow: false,
                created_at: now,
                updated_at: now,
            });
            await trx('transactions').insert({
                id: (0, uuid_1.generateId)(),
                account_id: destinationAccount.id,
                transaction_type: 'intrabank',
                beneficiary_name: sourceAccount.account_name,
                beneficiary_account_number: sourceAccount.account_number,
                beneficiary_bank: BANK_NAME,
                session_id: sessionId,
                transaction_reference: (0, transaction_1.generateTransactionRef)(),
                transaction_charges: 0,
                transaction_amount: data.amount,
                is_inflow: true,
                created_at: now,
                updated_at: now,
            });
        });
        const updatedSource = await account_model_1.AccountModel.findByAccountNumber(data.source_account_number);
        return {
            status_code: 200,
            success: true,
            message: 'Transfer successful',
            data: updatedSource,
        };
    }
    async withdrawFunds(userId, data) {
        const account = await account_model_1.AccountModel.findByAccountNumber(data.account_number);
        if (!account) {
            return { status_code: 404, success: false, message: 'Account not found' };
        }
        if (account.user_id !== userId) {
            return { status_code: 403, success: false, message: 'Access denied' };
        }
        if (account.account_status !== 'active') {
            return { status_code: 400, success: false, message: 'Account is not active' };
        }
        if (Number(account.account_balance) < data.amount) {
            return { status_code: 400, success: false, message: 'Insufficient funds' };
        }
        await database_1.default.transaction(async (trx) => {
            const newBalance = Number(account.account_balance) - data.amount;
            await trx('accounts')
                .where({ id: account.id })
                .update({ account_balance: newBalance, account_dir: 'debit', updated_at: new Date() });
            await trx('transactions').insert({
                id: (0, uuid_1.generateId)(),
                account_id: account.id,
                transaction_type: 'self',
                beneficiary_name: account.account_name,
                beneficiary_account_number: account.account_number,
                beneficiary_bank: BANK_NAME,
                session_id: (0, transaction_1.generateSessionId)(),
                transaction_reference: (0, transaction_1.generateTransactionRef)(),
                transaction_charges: 0,
                transaction_amount: data.amount,
                is_inflow: false,
                created_at: new Date(),
                updated_at: new Date(),
            });
        });
        const updatedAccount = await account_model_1.AccountModel.findByAccountNumber(data.account_number);
        return {
            status_code: 200,
            success: true,
            message: 'Withdrawal successful',
            data: updatedAccount,
        };
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map