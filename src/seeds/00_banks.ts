import type { Knex } from 'knex'
import { banks } from '../data/bank'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('banks').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  await knex('banks').insert(
    banks.map((b) => ({
      id: b.bankId,
      bank_name: b.bankName,
      bank_code: b.bankCode,
      swift_code: b.swiftCode,
      country: b.country,
      currency: b.currency,
      is_active: b.isActive,
      created_at: b.createdAt,
      updated_at: b.updatedAt,
    }))
  )
}
