import { Router } from 'express'
import { PinController } from '../controllers/pin.controller'
import { validateDto } from '../middlewares/validate.Dto'
import { authenticateToken } from '../middlewares/authmiddleware'
import { SetPinDTO, ChangePinDTO, VerifyPinDTO } from '../Dto/usersPin/usersPin.dto'

const router = Router()
const pinController = new PinController()

router.post(
  '/',
  authenticateToken,
  validateDto(SetPinDTO),
  pinController.setPinController.bind(pinController)
)

router.put(
  '/change',
  authenticateToken,
  validateDto(ChangePinDTO),
  pinController.changePinController.bind(pinController)
)

router.post(
  '/verify',
  authenticateToken,
  validateDto(VerifyPinDTO),
  pinController.verifyPinController.bind(pinController)
)

export default router
