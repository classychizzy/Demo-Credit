import type { Knex } from 'knex'
import { ACCOUNT_IDS, ACCOUNT_NUMBERS } from './data/seeds.data'

const BANK_NAME = 'DemoCredit'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('transactions').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  await knex('transactions').insert([
    // Chidi receives a deposit of ₦500,000
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
      account_id: ACCOUNT_IDS.chidi_savings,
      transaction_type: 'deposit',
      beneficiary_name: 'CHIDI OKAFOR',
      beneficiary_account_number: ACCOUNT_NUMBERS.chidi_savings,
      beneficiary_bank: BANK_NAME,
      session_id: '99999220260601120000000001',
      transaction_reference: 'TXN-20260601-SEED0001',
      transaction_charges: 0,
      transaction_amount: 500000.00,
      is_inflow: true,
    },

    // Chidi transfers ₦250,000 to Amara (outflow from Chidi)
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
      account_id: ACCOUNT_IDS.chidi_savings,
      transaction_type: 'intrabank',
      beneficiary_name: 'AMARA NWOSU',
      beneficiary_account_number: ACCOUNT_NUMBERS.amara_current,
      beneficiary_bank: BANK_NAME,
      session_id: '99999220260605143000000002',
      transaction_reference: 'TXN-20260605-SEED0002',
      transaction_charges: 0,
      transaction_amount: 250000.00,
      is_inflow: false,
    },

    // Amara receives ₦250,000 from Chidi (inflow to Amara) — same session
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
      account_id: ACCOUNT_IDS.amara_current,
      transaction_type: 'intrabank',
      beneficiary_name: 'CHIDI OKAFOR',
      beneficiary_account_number: ACCOUNT_NUMBERS.chidi_savings,
      beneficiary_bank: BANK_NAME,
      session_id: '99999220260605143000000003',
      transaction_reference: 'TXN-20260605-SEED0003',
      transaction_charges: 0,
      transaction_amount: 250000.00,
      is_inflow: true,
    },

    // Amara withdraws ₦50,000
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380004',
      account_id: ACCOUNT_IDS.amara_current,
      transaction_type: 'withdrawal',
      beneficiary_name: 'AMARA NWOSU',
      beneficiary_account_number: ACCOUNT_NUMBERS.amara_current,
      beneficiary_bank: BANK_NAME,
      session_id: '99999220260607091500000004',
      transaction_reference: 'TXN-20260607-SEED0004',
      transaction_charges: 0,
      transaction_amount: 50000.00,
      is_inflow: false,
    },

    // Emeka deposits ₦75,000 into wallet
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380005',
      account_id: ACCOUNT_IDS.emeka_wallet,
      transaction_type: 'deposit',
      beneficiary_name: 'EMEKA ADELEKE',
      beneficiary_account_number: ACCOUNT_NUMBERS.emeka_wallet,
      beneficiary_bank: BANK_NAME,
      session_id: '99999220260608160000000005',
      transaction_reference: 'TXN-20260608-SEED0005',
      transaction_charges: 0,
      transaction_amount: 75000.00,
      is_inflow: true,
    },

    // Emeka sends ₦100,000 interbank to GTBank
    {
      id: 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380006',
      account_id: ACCOUNT_IDS.emeka_savings,
      transaction_type: 'interbank',
      beneficiary_name: 'JOHN DOE',
      beneficiary_account_number: '0123456789',
      beneficiary_bank: 'Guaranty Trust Bank',
      session_id: '99999220260610083000000006',
      transaction_reference: 'TXN-20260610-SEED0006',
      transaction_charges: 0,
      transaction_amount: 100000.00,
      is_inflow: false,
    },
  ])
}
