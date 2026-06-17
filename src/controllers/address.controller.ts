import { Response } from 'express'
import { AuthenticatedRequest } from '../types/express/authRequest'
import { AddressService } from '../services/address/address.service'

export class AddressController {
  private addressService: AddressService

  constructor() {
    this.addressService = new AddressService()
  }

  public async createAddressController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.addressService.createAddress(req.user.id, req.body)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async getMyAddressController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.addressService.getMyAddress(req.user.id)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async updateAddressController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.addressService.updateAddress(req.user.id, req.body)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }
}
