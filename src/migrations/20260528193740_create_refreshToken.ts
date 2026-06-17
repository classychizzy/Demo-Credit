import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('refresh_tokens', table => {
    table.string('id', 36).primary()
    table.text('tokenhash').notNullable()
    table.timestamp('expired_at').notNullable()
    table.timestamp('revoked_at').nullable()
  })

  await knex.raw(`
    ALTER TABLE refresh_tokens
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `)
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('refresh_tokens')
}
