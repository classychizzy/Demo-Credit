import { Response } from 'express'
import { AuthenticatedRequest } from '../types/express/authRequest'
import { PinService } from '../services/pin/pin.service'
import { SetPinDTO, ChangePinDTO, VerifyPinDTO } from '../Dto/usersPin/usersPin.dto'

export class PinController {
  private pinService: PinService

  constructor() {
    this.pinService = new PinService()
  }

  public async setPinController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as SetPinDTO
      const response = await this.pinService.setPin(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async changePinController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as ChangePinDTO
      const response = await this.pinService.changePin(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }

  public async verifyPinController(req: AuthenticatedRequest, res: Response) {
    try {
      const data = req.body as VerifyPinDTO
      const response = await this.pinService.verifyPin(req.user.id, data)
      return res.status(response.status_code).json(response)
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' })
    }
  }
}
