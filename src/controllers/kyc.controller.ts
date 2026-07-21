import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express/authRequest';
import { KYCService } from '../services/kyc.service';

export class KYCController {
  private kycService: KYCService;

  constructor() {
    this.kycService = new KYCService();
  }

  public async submitKYCController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.kycService.submitKYC(req.user.id, req.body);
      return res.status(response.status_code).json(response);
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
    }
  }

  public async getKYCStatusController(req: AuthenticatedRequest, res: Response) {
    try {
      const response = await this.kycService.getKYCStatus(req.user.id);
      return res.status(response.status_code).json(response);
    } catch (error: any) {
      return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
    }
  }
}
