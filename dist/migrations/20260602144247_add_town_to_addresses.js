"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('addresses', (table) => {
        table.string('town');
    });
}
async function down(knex) {
    await knex.schema.alterTable('addresses', (table) => {
        table.dropColumn('town');
    });
}
//# sourceMappingURL=20260602144247_add_town_to_addresses.js.map