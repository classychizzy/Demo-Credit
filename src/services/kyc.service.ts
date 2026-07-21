import { KYCModel } from '../models/kyc.model';
import { UserModel } from '../models/user.model';
import { banks } from '../data/bank';
import { VerifyKYCDTO } from '../Dto/kyc/kyc.dto';
import { ResponseDto } from '../Dto/response/response.dto';

export class KYCService {
  async submitKYC(userId: string, payload: VerifyKYCDTO): Promise<ResponseDto> {
    const existing = await KYCModel.findByUserId(userId);
    if (existing?.kyc_status === 'verified') {
      return { status_code: 409, success: false, message: 'KYC already verified' };
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return { status_code: 404, success: false, message: 'User not found' };
    }

    const bank = banks.find((b) => b.bankCode === payload.bank_code);
    if (!bank) {
      return { status_code: 400, success: false, message: 'Invalid bank code' };
    }

    const account_name = `${user.first_name} ${user.last_name}`.toUpperCase();
    const bvn_verified = true; // matchBVN() in production

    let kyc;

    if (existing) {
      await KYCModel.updateKYC(userId, {
        ...payload,
        account_name,
        bvn_verified,
        kyc_status: 'pending',
        rejection_reason: null,
      });
      kyc = await KYCModel.findByUserId(userId);
    } else {
      kyc = await KYCModel.create({
        user_id: userId,
        ...payload,
        account_name,
      });
    }

    // simulate manual review — admin updates status in production
    setTimeout(async () => {
      await KYCModel.updateStatus(userId, 'verified');
    }, 5000);

    return { status_code: existing ? 200 : 201, success: true, message: 'KYC submitted successfully', data: kyc };
  }

  async getKYCStatus(userId: string): Promise<ResponseDto> {
    const kyc = await KYCModel.findByUserId(userId);
    if (!kyc) {
      return { status_code: 404, success: false, message: 'KYC record not found' };
    }
    return { status_code: 200, success: true, message: 'KYC status retrieved successfully', data: kyc };
  }
}
