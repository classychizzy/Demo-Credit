import db from '../config/database';
import { generateId } from '../utils/uuid';

const TABLE = 'kyc';

export const KYCModel = {
  async create(data: {
    user_id: string;
    account_number: string;
    bank_code: string;
    account_name: string;
    id_type: string;
    id_number: string;
    id_document_url: string;
    utility_bill_url: string;
  }) {
    const id = generateId();

    await db(TABLE).insert({
      id,
      ...data,
      bvn_verified: false,
      kyc_status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string) {
    return db(TABLE).where({ user_id }).first();
  },

  async updateStatus(
    user_id: string,
    kyc_status: 'pending' | 'verified' | 'failed',
    rejection_reason?: string
  ) {
    return db(TABLE)
  .where({ user_id })
  .update({
    kyc_status,
    rejection_reason:
      kyc_status === "failed"
        ? rejection_reason
        : null,
    updated_at: new Date(),
  });;
  },

  async updateKYC(user_id: string, data: Partial<{
    account_number: string;
    bank_code: string;
    account_name: string;
    id_type: string;
    id_number: string;
    id_document_url: string;
    utility_bill_url: string;
    bvn_verified: boolean;
    kyc_status: 'pending' | 'verified' | 'failed';
    rejection_reason: string | null;
  }>) {
    return db(TABLE).where({ user_id }).update({
      ...data,
      updated_at: new Date(),
    });
  },
};