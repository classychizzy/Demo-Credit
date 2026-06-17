"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('kyc', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable().unique();
        // bank account details
        table.string('account_number').notNullable();
        table.string('bank_code').notNullable();
        table.string('account_name').notNullable();
        table.boolean('bvn_verified').defaultTo(false);
        // government issued ID
        table.enum('id_type', [
            'nin',
            'drivers_license',
            'voters_card',
            'international_passport',
        ]).notNullable();
        table.string('id_number').notNullable();
        table.string('id_document_url').notNullable(); // uploaded ID image
        // proof of address
        table.string('utility_bill_url').notNullable(); // utility/light bill image
        // verification status
        table.enum('kyc_status', ['pending', 'verified', 'failed']).defaultTo('pending');
        table.string('rejection_reason').nullable(); // populated if kyc_status = 'failed'
        table.timestamps(true, true);
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}
async function down(knex) {
    await knex.schema.dropTable('kyc');
}
//# sourceMappingURL=20260528074347_create_kyc.js.map