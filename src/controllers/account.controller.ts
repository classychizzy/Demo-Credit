import { Response, Request } from 'express'
import { AuthenticatedRequest } from '../types/express/authRequest'
import { AccountService } from '../services/account/account.service'

export class AccountController {
  private accountService: AccountService

  constructor() {
    this.accountService = new AccountService()
  }

  public async createAccountController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.accountService.createAccount(req.user.id, req.body)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async getMyAccountsController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.accountService.getMyAccounts(req.user.id)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async getAccountByNumberController(req: Request, res: Response) {
    try {
      const account_number = req.params['account_number'] as string
      const response = await this.accountService.getAccountByNumber(account_number)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }
}
