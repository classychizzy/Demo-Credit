import { Router } from 'express';
import { KYCController } from '../controllers/kyc.controller';
import { validateDto } from '../middlewares/validate.Dto';
import { authenticateToken } from '../middlewares/authmiddleware';
import { VerifyKYCDTO } from '../Dto/kyc/kyc.dto';

const router = Router();
const kycController = new KYCController();

router.post(
  '/',
  authenticateToken,
  validateDto(VerifyKYCDTO),
  kycController.submitKYCController.bind(kycController)
);

router.get(
  '/me',
  authenticateToken,
  kycController.getKYCStatusController.bind(kycController)
);

export default router;
