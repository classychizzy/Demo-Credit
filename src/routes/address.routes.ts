import { Router } from 'express'
import { AddressController } from '../controllers/address.controller'
import { validateDto } from '../middlewares/validate.Dto'
import { authenticateToken } from '../middlewares/authmiddleware'
import { CreateAddressRequestDTO } from '../Dto/address/createAddress.request.dto'

const router = Router()
const addressController = new AddressController()

router.post(
  '/',
  authenticateToken,
  validateDto(CreateAddressRequestDTO),
  addressController.createAddressController.bind(addressController)
)

router.get(
  '/me',
  authenticateToken,
  addressController.getMyAddressController.bind(addressController)
)

router.put(
  '/me',
  authenticateToken,
  addressController.updateAddressController.bind(addressController)
)

export default router
