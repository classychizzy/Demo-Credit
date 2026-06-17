"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const address_model_1 = require("../../models/address.model");
class AddressService {
    async createAddress(userId, data) {
        const existing = await address_model_1.AddressModel.findByUserId(userId);
        if (existing) {
            return { status_code: 409, success: false, message: 'Address already exists for this user' };
        }
        const payload = {
            ...data,
            user_id: userId,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const address = await address_model_1.AddressModel.create(payload);
        return { status_code: 201, success: true, message: 'Address created successfully', data: address };
    }
    async getMyAddress(userId) {
        const address = await address_model_1.AddressModel.findByUserId(userId);
        if (!address) {
            return { status_code: 404, success: false, message: 'Address not found' };
        }
        return { status_code: 200, success: true, message: 'Address retrieved successfully', data: address };
    }
    async updateAddress(userId, data) {
        const existing = await address_model_1.AddressModel.findByUserId(userId);
        if (!existing) {
            return { status_code: 404, success: false, message: 'Address not found' };
        }
        const updated = await address_model_1.AddressModel.update(existing.id, data);
        return { status_code: 200, success: true, message: 'Address updated successfully', data: updated };
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map