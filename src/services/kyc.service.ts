// services/kyc.service.ts
import { KYCModel } from '../models/kyc.model';
import { UserModel } from '../models/user.model';
import { banks} from '../data/bank'
import { VerifyKYCDTO } from '../Dto/kyc/kyc.dto';
import { Bank } from '../data/bank.dto';

export async function submitKYC(userId: string, payload: VerifyKYCDTO) {
  const existing = await KYCModel.findByUserId(userId);
  if (existing?.kyc_status === 'verified') {
    throw new Error('KYC already verified');
  }

  // fetch user to simulate BVN cross-check
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  // validate bank code
  const bank: Bank  | undefined = banks.find((b) => bank?.bankCode === payload.bank_code);
  if (!bank) throw new Error('Invalid bank code');

  // simulate resolved account name
  const account_name = `${user.first_name} ${user.last_name}`.toUpperCase();

  // simulate BVN verified against account
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

  // simulate manual review delay — in production
  // an admin reviews documents and updates status
  setTimeout(async () => {
    await KYCModel.updateStatus(userId, 'verified');
  }, 5000);

  return kyc;
}

export async function getKYCStatus(userId: string) {
  const kyc = await KYCModel.findByUserId(userId);
  if (!kyc) throw new Error('KYC record not found');
  return kyc;
}