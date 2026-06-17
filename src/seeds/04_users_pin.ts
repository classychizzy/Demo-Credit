import type { Knex } from 'knex'
import bcrypt from 'bcrypt'
import { USER_IDS } from './data/seeds.data'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('users_pin').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  const pin = await bcrypt.hash('1234', 10)

  await knex('users_pin').insert([
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
      user_id: USER_IDS.chidi,
      pin,
    },
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
      user_id: USER_IDS.amara,
      pin,
    },
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
      user_id: USER_IDS.emeka,
      pin,
    },
  ])
}
