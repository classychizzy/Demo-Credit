"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../controllers/address.controller");
const validate_Dto_1 = require("../middlewares/validate.Dto");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const createAddress_request_dto_1 = require("../Dto/address/createAddress.request.dto");
const router = (0, express_1.Router)();
const addressController = new address_controller_1.AddressController();
router.post('/', authmiddleware_1.authenticateToken, (0, validate_Dto_1.validateDto)(createAddress_request_dto_1.CreateAddressRequestDTO), addressController.createAddressController.bind(addressController));
router.get('/me', authmiddleware_1.authenticateToken, addressController.getMyAddressController.bind(addressController));
router.put('/me', authmiddleware_1.authenticateToken, addressController.updateAddressController.bind(addressController));
exports.default = router;
//# sourceMappingURL=address.routes.js.map