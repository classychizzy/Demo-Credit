"use strict";
// NIP (NIBSS Instant Payment) inspired formats
// Session ID:  {bank_code_6}{YYYYMMDD}{HHmmss}{seq_6}  — 26 numeric chars
// Transaction reference: TXN-{YYYYMMDD}-{RANDOM_8_ALPHANUM_UPPER}
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionId = generateSessionId;
exports.generateTransactionRef = generateTransactionRef;
const BANK_CODE = '999992'; // DemoCredit internal institution code
function pad(n, len) {
    return String(n).padStart(len, '0');
}
function timestamp() {
    const now = new Date();
    const date = String(now.getFullYear()) +
        pad(now.getMonth() + 1, 2) +
        pad(now.getDate(), 2);
    const time = pad(now.getHours(), 2) +
        pad(now.getMinutes(), 2) +
        pad(now.getSeconds(), 2);
    return { date, time };
}
function randomNumeric(len) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
}
function randomAlphaNum(len) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function generateSessionId() {
    const { date, time } = timestamp();
    return `${BANK_CODE}${date}${time}${randomNumeric(6)}`;
}
function generateTransactionRef() {
    const { date } = timestamp();
    return `TXN-${date}-${randomAlphaNum(8)}`;
}
//# sourceMappingURL=transaction.js.map