"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('refresh_tokens', table => {
        table.string('id', 36).primary();
        table.text('tokenhash').notNullable();
        table.timestamp('expired_at').notNullable();
        table.timestamp('revoked_at').nullable();
    });
    await knex.raw(`
    ALTER TABLE refresh_tokens
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);
}
async function down(knex) {
    await knex.schema.dropTable('refresh_tokens');
}
//# sourceMappingURL=20260528193740_create_refreshToken.js.map