import bcrypt from 'bcrypt'
import { ResponseDto } from '../../Dto/response/response.dto'
import { FundAccountDTO } from '../../Dto/wallet/fund.dto'
import { TransferDTO } from '../../Dto/wallet/transfer.dto'
import { InterbankTransferDTO } from '../../Dto/wallet/interbank_transfer.dto'
import { WithdrawDTO } from '../../Dto/wallet/withdraw.dto'
import { AccountModel } from '../../models/account.model'
import { UsersPinModel } from '../../models/usersPin.model'
import { generateId } from '../../utils/uuid'
import { generateSessionId, generateTransactionRef } from '../../utils/transaction'
import { TransactionType } from '../../enum/transaction'
import db from '../../config/database'

const BANK_NAME = 'DemoCredit'

async function verifyPin(userId: string, pin: string): Promise<boolean> {
  const record = await UsersPinModel.findByUserId(userId)
  if (!record) return false
  return bcrypt.compare(pin, record.pin)
}

export class WalletService {
  async fundAccount(
    userId: string,
    data: FundAccountDTO
  ): Promise<ResponseDto> {
    const account = await AccountModel.findByAccountNumber(data.account_number)

    if (!account) {
      return { status_code: 404, success: false, message: 'Account not found' }
    }

    if (account.user_id !== userId) {
      return { status_code: 403, success: false, message: 'Access denied' }
    }

    if (account.account_status !== 'active') {
      return { status_code: 400, success: false, message: 'Account is not active' }
    }

    await db.transaction(async (trx) => {
      const newBalance = Number(account.account_balance) + data.amount

      await trx('accounts')
        .where({ id: account.id })
        .update({ account_balance: newBalance, account_dir: 'credit', updated_at: new Date() })

      await trx('transactions').insert({
        id: generateId(),
        account_id: account.id,
        transaction_type: TransactionType.DEPOSIT,
        beneficiary_name: account.account_name,
        beneficiary_account_number: account.account_number,
        beneficiary_bank: BANK_NAME,
        session_id: generateSessionId(),
        transaction_reference: generateTransactionRef(),
        transaction_charges: 0,
        transaction_amount: data.amount,
        is_inflow: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })

    const updatedAccount = await AccountModel.findByAccountNumber(data.account_number)

    return {
      status_code: 200,
      success: true,
      message: 'Account funded successfully',
      data: updatedAccount,
    }
  }

  async transferFunds(
    userId: string,
    data: TransferDTO
  ): Promise<ResponseDto> {
    if (!await verifyPin(userId, data.pin)) {
      return { status_code: 401, success: false, message: 'Incorrect PIN' }
    }

    if (data.source_account_number === data.destination_account_number) {
      return { status_code: 400, success: false, message: 'Cannot transfer to the same account' }
    }

    const sourceAccount = await AccountModel.findByAccountNumber(data.source_account_number)

    if (!sourceAccount) {
      return { status_code: 404, success: false, message: 'Source account not found' }
    }

    if (sourceAccount.user_id !== userId) {
      return { status_code: 403, success: false, message: 'Access denied' }
    }

    if (sourceAccount.account_status !== 'active') {
      return { status_code: 400, success: false, message: 'Source account is not active' }
    }

    if (Number(sourceAccount.account_balance) < data.amount) {
      return { status_code: 400, success: false, message: 'Insufficient funds' }
    }

    const destinationAccount = await AccountModel.findByAccountNumber(data.destination_account_number)

    if (!destinationAccount) {
      return { status_code: 404, success: false, message: 'Destination account not found' }
    }

    if (destinationAccount.account_status !== 'active') {
      return { status_code: 400, success: false, message: 'Destination account is not active' }
    }

    await db.transaction(async (trx) => {
      const newSourceBalance = Number(sourceAccount.account_balance) - data.amount
      const newDestinationBalance = Number(destinationAccount.account_balance) + data.amount
      const sessionId = generateSessionId()
      const now = new Date()

      await trx('accounts')
        .where({ id: sourceAccount.id })
        .update({ account_balance: newSourceBalance, account_dir: 'debit', updated_at: now })

      await trx('accounts')
        .where({ id: destinationAccount.id })
        .update({ account_balance: newDestinationBalance, account_dir: 'credit', updated_at: now })

      await trx('transactions').insert({
        id: generateId(),
        account_id: sourceAccount.id,
        transaction_type: TransactionType.INTRABANK,
        beneficiary_name: destinationAccount.account_name,
        beneficiary_account_number: destinationAccount.account_number,
        beneficiary_bank: BANK_NAME,
        session_id: sessionId,
        transaction_reference: generateTransactionRef(),
        transaction_charges: 0,
        transaction_amount: data.amount,
        is_inflow: false,
        created_at: now,
        updated_at: now,
      })

      await trx('transactions').insert({
        id: generateId(),
        account_id: destinationAccount.id,
        transaction_type: TransactionType.INTRABANK,
        beneficiary_name: sourceAccount.account_name,
        beneficiary_account_number: sourceAccount.account_number,
        beneficiary_bank: BANK_NAME,
        session_id: sessionId,
        transaction_reference: generateTransactionRef(),
        transaction_charges: 0,
        transaction_amount: data.amount,
        is_inflow: true,
        created_at: now,
        updated_at: now,
      })
    })

    const updatedSource = await AccountModel.findByAccountNumber(data.source_account_number)

    return {
      status_code: 200,
      success: true,
      message: 'Transfer successful',
      data: updatedSource,
    }
  }

  async withdrawFunds(
    userId: string,
    data: WithdrawDTO
  ): Promise<ResponseDto> {
    if (!await verifyPin(userId, data.pin)) {
      return { status_code: 401, success: false, message: 'Incorrect PIN' }
    }

    const account = await AccountModel.findByAccountNumber(data.account_number)

    if (!account) {
      return { status_code: 404, success: false, message: 'Account not found' }
    }

    if (account.user_id !== userId) {
      return { status_code: 403, success: false, message: 'Access denied' }
    }

    if (account.account_status !== 'active') {
      return { status_code: 400, success: false, message: 'Account is not active' }
    }

    if (Number(account.account_balance) < data.amount) {
      return { status_code: 400, success: false, message: 'Insufficient funds' }
    }

    await db.transaction(async (trx) => {
      const newBalance = Number(account.account_balance) - data.amount

      await trx('accounts')
        .where({ id: account.id })
        .update({ account_balance: newBalance, account_dir: 'debit', updated_at: new Date() })

      await trx('transactions').insert({
        id: generateId(),
        account_id: account.id,
        transaction_type: TransactionType.WITHDRAWAL,
        beneficiary_name: account.account_name,
        beneficiary_account_number: account.account_number,
        beneficiary_bank: BANK_NAME,
        session_id: generateSessionId(),
        transaction_reference: generateTransactionRef(),
        transaction_charges: 0,
        transaction_amount: data.amount,
        is_inflow: false,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })

    const updatedAccount = await AccountModel.findByAccountNumber(data.account_number)

    return {
      status_code: 200,
      success: true,
      message: 'Withdrawal successful',
      data: updatedAccount,
    }
  }

  async interBankTransfer(
    userId: string,
    data: InterbankTransferDTO
  ): Promise<ResponseDto> {
    if (!await verifyPin(userId, data.pin)) {
      return { status_code: 401, success: false, message: 'Incorrect PIN' }
    }

    const sourceAccount = await AccountModel.findByAccountNumber(data.source_account_number)

    if (!sourceAccount) {
      return { status_code: 404, success: false, message: 'Source account not found' }
    }

    if (sourceAccount.user_id !== userId) {
      return { status_code: 403, success: false, message: 'Access denied' }
    }

    if (sourceAccount.account_status !== 'active') {
      return { status_code: 400, success: false, message: 'Account is not active' }
    }

    if (Number(sourceAccount.account_balance) < data.amount) {
      return { status_code: 400, success: false, message: 'Insufficient funds' }
    }

    await db.transaction(async (trx) => {
      const newBalance = Number(sourceAccount.account_balance) - data.amount

      await trx('accounts')
        .where({ id: sourceAccount.id })
        .update({ account_balance: newBalance, account_dir: 'debit', updated_at: new Date() })

      await trx('transactions').insert({
        id: generateId(),
        account_id: sourceAccount.id,
        transaction_type: TransactionType.INTERBANK,
        beneficiary_name: data.destination_account_name,
        beneficiary_account_number: data.destination_account_number,
        beneficiary_bank: data.destination_bank_name,
        session_id: generateSessionId(),
        transaction_reference: generateTransactionRef(),
        transaction_charges: 0,
        transaction_amount: data.amount,
        is_inflow: false,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })

    const updatedAccount = await AccountModel.findByAccountNumber(data.source_account_number)

    return {
      status_code: 200,
      success: true,
      message: 'Interbank transfer successful',
      data: updatedAccount,
    }
  }
}
