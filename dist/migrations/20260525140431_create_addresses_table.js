"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('addresses', (table) => {
        table.string('id', 36).primary();
        table.string('user_id', 36).notNullable();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('country').notNullable();
        table.string('postal_code').notNullable();
        table.string('town').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('addresses');
}
//# sourceMappingURL=20260525140431_create_addresses_table.js.map