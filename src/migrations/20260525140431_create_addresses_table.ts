import type { Knex } from "knex";




export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('addresses', (table) => {
    table.string('id', 36).primary();
    table.string('user_id', 36).notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('house_number').notNullable();
    table.string('town').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('postal_code').notNullable();
  });

  
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('addresses');
}
