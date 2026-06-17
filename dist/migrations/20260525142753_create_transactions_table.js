"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.uuid('account_id').notNullable();
        table.enum('transaction_type', [
            'transfer',
            'deposit',
            'withdrawal',
        ]).notNullable();
        table.string('beneficiary_name').notNullable();
        table.string('beneficiary_account_number').notNullable();
        table.string('beneficiary_bank').notNullable();
        table.string('session_id').notNullable().unique();
        table.string('transaction_reference').notNullable().unique();
        table.decimal('transaction_charges', 10, 2).notNullable().defaultTo(0.00);
        table.decimal('transaction_amount', 10, 2).notNullable();
        table.boolean('is_inflow').notNullable();
        table.timestamps(true, true);
        table.foreign('account_id').references('id').inTable('accounts').onDelete('CASCADE');
    });
}
async function down(knex) {
    await knex.schema.dropTable('transactions');
}
//# sourceMappingURL=20260525142753_create_transactions_table.js.map