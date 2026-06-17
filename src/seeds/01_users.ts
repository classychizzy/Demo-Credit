import type { Knex } from 'knex'
import bcrypt from 'bcrypt'
import { USER_IDS } from './data/seeds.data'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('users').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  const password = await bcrypt.hash('Password@123', 10)

  await knex('users').insert([
    {
      id: USER_IDS.chidi,
      first_name: 'Chidi',
      last_name: 'Okafor',
      email: 'chidi.okafor@democredit.dev',
      phone_number: '08012345678',
      password,
      gender: 'male',
      bvn: '12345678901',
      date_of_birth: '1990-05-15',
      is_active: true,
    },
    {
      id: USER_IDS.amara,
      first_name: 'Amara',
      last_name: 'Nwosu',
      email: 'amara.nwosu@democredit.dev',
      phone_number: '08023456789',
      password,
      gender: 'female',
      bvn: '23456789012',
      date_of_birth: '1995-08-22',
      is_active: true,
    },
    {
      id: USER_IDS.emeka,
      first_name: 'Emeka',
      last_name: 'Adeleke',
      email: 'emeka.adeleke@democredit.dev',
      phone_number: '08034567890',
      password,
      gender: 'male',
      bvn: '34567890123',
      date_of_birth: '1988-12-03',
      is_active: true,
    },
  ])
}
