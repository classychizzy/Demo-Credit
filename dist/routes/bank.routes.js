"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bank_controller_1 = require("../controllers/bank.controller");
const router = (0, express_1.Router)();
const bankController = new bank_controller_1.BankController();
router.get("/", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.post("/", bankController.createBank);
router.delete("/:id", bankController.deleteBank);
exports.default = router;
//# sourceMappingURL=bank.routes.js.map