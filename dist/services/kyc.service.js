"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitKYC = submitKYC;
exports.getKYCStatus = getKYCStatus;
// services/kyc.service.ts
const kyc_model_1 = require("../models/kyc.model");
const user_model_1 = require("../models/user.model");
const bank_1 = require("../data/bank");
async function submitKYC(userId, payload) {
    const existing = await kyc_model_1.KYCModel.findByUserId(userId);
    if (existing?.kyc_status === 'verified') {
        throw new Error('KYC already verified');
    }
    // fetch user to simulate BVN cross-check
    const user = await user_model_1.UserModel.findById(userId);
    if (!user)
        throw new Error('User not found');
    // validate bank code
    const bank = bank_1.banks.find((b) => bank?.bankCode === payload.bank_code);
    if (!bank)
        throw new Error('Invalid bank code');
    // simulate resolved account name
    const account_name = `${user.first_name} ${user.last_name}`.toUpperCase();
    // simulate BVN verified against account
    const bvn_verified = true; // matchBVN() in production
    let kyc;
    if (existing) {
        await kyc_model_1.KYCModel.updateKYC(userId, {
            ...payload,
            account_name,
            bvn_verified,
            kyc_status: 'pending',
            rejection_reason: null,
        });
        kyc = await kyc_model_1.KYCModel.findByUserId(userId);
    }
    else {
        kyc = await kyc_model_1.KYCModel.create({
            user_id: userId,
            ...payload,
            account_name,
        });
    }
    // simulate manual review delay — in production
    // an admin reviews documents and updates status
    setTimeout(async () => {
        await kyc_model_1.KYCModel.updateStatus(userId, 'verified');
    }, 5000);
    return kyc;
}
async function getKYCStatus(userId) {
    const kyc = await kyc_model_1.KYCModel.findByUserId(userId);
    if (!kyc)
        throw new Error('KYC record not found');
    return kyc;
}
//# sourceMappingURL=kyc.service.js.map