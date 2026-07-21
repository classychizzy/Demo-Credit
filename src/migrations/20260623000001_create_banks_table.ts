import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('banks', (table) => {
    table.string('id', 36).primary()
    table.string('bank_name').notNullable()
    table.string('bank_code', 10).notNullable().unique()
    table.string('swift_code', 20).notNullable()
    table.string('country').notNullable()
    table.string('currency', 10).notNullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('banks')
}
