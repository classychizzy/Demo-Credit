import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE transactions
    MODIFY COLUMN transaction_type ENUM('deposit', 'withdrawal', 'intrabank', 'interbank') NOT NULL
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE transactions
    MODIFY COLUMN transaction_type ENUM('transfer', 'deposit', 'withdrawal') NOT NULL
  `);
}
