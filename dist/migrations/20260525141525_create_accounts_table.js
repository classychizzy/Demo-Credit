"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('accounts', (table) => {
        table.string('id', 36).primary();
        table.string('user_id', 36).notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.enum('account_type', ['savings', 'current', 'wallet']).notNullable();
        table.string('account_number', 10).notNullable().unique();
        table.string('account_name').notNullable();
        table.enum('account_dir', ['debit', 'credit']).notNullable();
        table.decimal('account_balance', 15, 2).notNullable().defaultTo(0.00);
        table.enum('account_status', ['active', 'inactive', 'frozen', 'closed']).notNullable().defaultTo('active');
    });
    await knex.raw(`
    ALTER TABLE accounts
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `);
}
async function down(knex) {
    await knex.schema.dropTable('accounts');
}
//# sourceMappingURL=20260525141525_create_accounts_table.js.map