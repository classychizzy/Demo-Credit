"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users_pin', (table) => {
        table.string('id', 36).primary();
        table.string('user_id', 36).notNullable().unique();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.string('pin').notNullable();
    });
    await knex.raw(`
    ALTER TABLE users_pin
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `);
}
async function down(knex) {
    await knex.schema.dropTable('users_pin');
}
//# sourceMappingURL=20260525192630_create_users_pin.js.map