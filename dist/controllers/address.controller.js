"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_service_1 = require("../services/address/address.service");
class AddressController {
    constructor() {
        this.addressService = new address_service_1.AddressService();
    }
    async createAddressController(req, res) {
        try {
            const response = await this.addressService.createAddress(req.user.id, req.body);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
    async getMyAddressController(req, res) {
        try {
            const response = await this.addressService.getMyAddress(req.user.id);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
    async updateAddressController(req, res) {
        try {
            const response = await this.addressService.updateAddress(req.user.id, req.body);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, success: false, message: error.message || 'Internal server error' });
        }
    }
}
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map