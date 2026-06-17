import { Router } from 'express'
import { WalletController } from '../controllers/wallet.controller'
import { validateDto } from '../middlewares/validate.Dto'
import { authenticateToken } from '../middlewares/authmiddleware'
import { fundRateLimiter, transferRateLimiter } from '../middlewares/rateLimiter'
import { FundAccountDTO } from '../Dto/wallet/fund.dto'
import { TransferDTO } from '../Dto/wallet/transfer.dto'
import { InterbankTransferDTO } from '../Dto/wallet/interbank_transfer.dto'
import { WithdrawDTO } from '../Dto/wallet/withdraw.dto'

const router = Router()
const walletController = new WalletController()

router.post(
  '/fund',
  authenticateToken,
  fundRateLimiter,
  validateDto(FundAccountDTO),
  walletController.fundAccountController.bind(walletController)
)

router.post(
  '/transfer',
  authenticateToken,
  transferRateLimiter,
  validateDto(TransferDTO),
  walletController.transferFundsController.bind(walletController)
)

router.post(
  '/withdraw',
  authenticateToken,
  validateDto(WithdrawDTO),
  walletController.withdrawFundsController.bind(walletController)
)

router.post(
  '/interbank-transfer',
  authenticateToken,
  transferRateLimiter,
  validateDto(InterbankTransferDTO),
  walletController.interBankTransferController.bind(walletController)
)

export default router
