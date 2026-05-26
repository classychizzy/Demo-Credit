"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, '../../.env');
dotenv_1.default.config({ path: envPath });
console.log('DB_USER:', process.env.DB_USER);
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'demo-credit',
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, '../migrations'),
            extension: 'ts',
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, '../seeds'),
        },
    },
    production: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL || '',
        migrations: {
            directory: path_1.default.resolve(__dirname, '../migrations'),
        },
    },
};
console.log('cwd:', process.cwd());
console.log('migrations dir:', path_1.default.resolve(process.cwd(), '../migrations'));
exports.default = config;
//# sourceMappingURL=knexfile.js.map