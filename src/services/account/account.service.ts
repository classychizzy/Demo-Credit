import { ResponseDto } from '../../Dto/response/response.dto'
import { CreateAccountRequestDTO } from '../../Dto/account/createAccount.request.dto'
import { AccountModel } from '../../models/account.model'
import { CreateAccountDTO } from '../../Dto/account/account.dto'
import { UserModel } from '../../models/user.model'

function generateAccountNumber(): string {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
}

export class AccountService {
  private accountModel: typeof AccountModel
  private userModel: typeof UserModel 
  constructor() {
    this.accountModel = AccountModel
    this.userModel = UserModel
  }

  async createAccount(
    userId: string,
    data: CreateAccountRequestDTO
  ): Promise<ResponseDto<CreateAccountDTO>> {
    let account_number: string
    let isUnique = false
    const user = await UserModel.findById(userId)


    if (!user) {
      const response: ResponseDto<CreateAccountDTO> = {
        status_code: 404,
        success: false,
        message: 'User not found',
      }
      return response
    }

    const accountName = `${user.first_name} ${user.last_name}`.toUpperCase();
    // Ensure the generated number is not already taken
    do {
      account_number = generateAccountNumber()
      const taken = await AccountModel.findByAccountNumber(account_number)
      isUnique = !taken
    } while (!isUnique)

    const payload: CreateAccountDTO = {
      id: '',
      user_id: userId,
      account_type: data.account_type,
      account_number,
      account_name: accountName,
      account_dir: 'credit',
      account_balance: 0,
      account_status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const account = await AccountModel.create(payload)

    return { status_code: 201, success: true, message: 'Account created successfully', data: account }
  }

  async getMyAccounts(userId: string): Promise<ResponseDto<CreateAccountDTO[]>> {
    const accounts = await AccountModel.findByUserId(userId)

    if (!accounts || accounts.length === 0) {
      return { status_code: 404, success: false, message: 'No accounts found' }
    }

    return { status_code: 200, success: true, message: 'Accounts retrieved successfully', data: accounts }
  }

  async getAccountByNumber(accountNumber: string): Promise<ResponseDto<CreateAccountDTO>> {
    const account = await AccountModel.findByAccountNumber(accountNumber)

    if (!account) {
      return { status_code: 404, success: false, message: 'Account not found' }
    }

    return { status_code: 200, success: true, message: 'Account retrieved successfully', data: account }
  }
}
