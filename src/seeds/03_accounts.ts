import type { Knex } from 'knex'
import { USER_IDS, ACCOUNT_IDS, ACCOUNT_NUMBERS } from './data/seeds.data'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('accounts').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  await knex('accounts').insert([
    {
      id: ACCOUNT_IDS.chidi_savings,
      user_id: USER_IDS.chidi,
      account_type: 'savings',
      account_number: ACCOUNT_NUMBERS.chidi_savings,
      account_name: 'CHIDI OKAFOR',
      account_dir: 'credit',
      account_balance: 250000.00,
      account_status: 'active',
    },
    {
      id: ACCOUNT_IDS.amara_current,
      user_id: USER_IDS.amara,
      account_type: 'current',
      account_number: ACCOUNT_NUMBERS.amara_current,
      account_name: 'AMARA NWOSU',
      account_dir: 'credit',
      account_balance: 500000.00,
      account_status: 'active',
    },
    {
      id: ACCOUNT_IDS.emeka_wallet,
      user_id: USER_IDS.emeka,
      account_type: 'wallet',
      account_number: ACCOUNT_NUMBERS.emeka_wallet,
      account_name: 'EMEKA ADELEKE',
      account_dir: 'credit',
      account_balance: 75000.00,
      account_status: 'active',
    },
    {
      id: ACCOUNT_IDS.emeka_savings,
      user_id: USER_IDS.emeka,
      account_type: 'savings',
      account_number: ACCOUNT_NUMBERS.emeka_savings,
      account_name: 'EMEKA ADELEKE',
      account_dir: 'debit',
      account_balance: 1200000.00,
      account_status: 'active',
    },
  ])
}
