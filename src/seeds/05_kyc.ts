import type { Knex } from 'knex'
import { USER_IDS, ACCOUNT_NUMBERS } from './data/seeds.data'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('kyc').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  await knex('kyc').insert([
    {
      id: 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
      user_id: USER_IDS.chidi,
      account_number: ACCOUNT_NUMBERS.chidi_savings,
      bank_code: '058',
      account_name: 'CHIDI OKAFOR',
      bvn_verified: true,
      id_type: 'nin',
      id_number: 'NIN12345678901',
      id_document_url: 'https://storage.democredit.dev/kyc/chidi_nin.jpg',
      utility_bill_url: 'https://storage.democredit.dev/kyc/chidi_utility.jpg',
      kyc_status: 'verified',
      rejection_reason: null,
    },
    {
      id: 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
      user_id: USER_IDS.amara,
      account_number: ACCOUNT_NUMBERS.amara_current,
      bank_code: '011',
      account_name: 'AMARA NWOSU',
      bvn_verified: false,
      id_type: 'drivers_license',
      id_number: 'DL-LA-234567',
      id_document_url: 'https://storage.democredit.dev/kyc/amara_dl.jpg',
      utility_bill_url: 'https://storage.democredit.dev/kyc/amara_utility.jpg',
      kyc_status: 'pending',
      rejection_reason: null,
    },
  ])
}
