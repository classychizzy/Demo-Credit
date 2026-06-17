import type { Knex } from 'knex'
import { USER_IDS } from './data/seeds.data'

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0')
  await knex('addresses').truncate()
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1')

  await knex('addresses').insert([
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
      user_id: USER_IDS.chidi,
      street: '12 Adeola Odeku Street',
      city: 'Victoria Island',
      town: 'Victoria Island',
      state: 'Lagos',
      country: 'Nigeria',
      postal_code: '101241',
    },
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
      user_id: USER_IDS.amara,
      street: '5 Awolowo Road',
      city: 'Ikoyi',
      town: 'Ikoyi',
      state: 'Lagos',
      country: 'Nigeria',
      postal_code: '101233',
    },
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
      user_id: USER_IDS.emeka,
      street: '22 Independence Layout',
      city: 'Enugu',
      town: 'Enugu',
      state: 'Enugu',
      country: 'Nigeria',
      postal_code: '400271',
    },
  ])
}
