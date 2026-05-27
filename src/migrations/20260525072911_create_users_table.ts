import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id', 36).primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone_number').notNullable().unique();
    table.string('password').notNullable();
    table.enum('gender', ['male', 'female', 'other']).notNullable();
    table.string('bvn').notNullable().unique();
    table.date('date_of_birth').notNullable();
    table.string('reset_token').nullable();
    table.boolean('is_active').notNullable().defaultTo(true); // 
    table.timestamp('reset_token_expires_at').nullable();
   // table.timestamps(true, true); // creates created_at and updated_at
  });

    await knex.raw(`
    ALTER TABLE users
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `);


}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

