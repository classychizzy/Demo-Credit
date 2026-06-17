import { Router } from 'express'
import { AccountController } from '../controllers/account.controller'
import { validateDto } from '../middlewares/validate.Dto'
import { authenticateToken } from '../middlewares/authmiddleware'
import { CreateAccountRequestDTO } from '../Dto/account/createAccount.request.dto'

const router = Router()
const accountController = new AccountController()

router.post(
  '/',
  authenticateToken,
  validateDto(CreateAccountRequestDTO),
  accountController.createAccountController.bind(accountController)
)

router.get(
  '/me',
  authenticateToken,
  accountController.getMyAccountsController.bind(accountController)
)

router.get(
  '/:account_number',
  authenticateToken,
  accountController.getAccountByNumberController.bind(accountController)
)

export default router
