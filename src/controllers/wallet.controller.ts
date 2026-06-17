import { Response } from 'express'
import { AuthenticatedRequest } from '../types/express/authRequest'
import { WalletService } from '../services/wallet/wallet.service'
import { FundAccountDTO } from '../Dto/wallet/fund.dto'
import { TransferDTO } from '../Dto/wallet/transfer.dto'
import { InterbankTransferDTO } from '../Dto/wallet/interbank_transfer.dto'
import { WithdrawDTO } from '../Dto/wallet/withdraw.dto'

export class WalletController {
  private walletService: WalletService

  constructor() {
    this.walletService = new WalletService()
  }

  public async fundAccountController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as FundAccountDTO
      const response = await this.walletService.fundAccount(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: error.message || 'Internal server error',
      })
    }
  }

  public async transferFundsController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as TransferDTO
      const response = await this.walletService.transferFunds(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: error.message || 'Internal server error',
      })
    }
  }

  public async withdrawFundsController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as WithdrawDTO
      const response = await this.walletService.withdrawFunds(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: error.message || 'Internal server error',
      })
    }
  }

  public async interBankTransferController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as InterbankTransferDTO
      const response = await this.walletService.interBankTransfer(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: error.message || 'Internal server error',
      })
    }
  }
}
