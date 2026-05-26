"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
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
async function down(knex) {
    await knex.schema.dropTable('addresses');
}
//# sourceMappingURL=20260525140431_create_addresses_table.js.map