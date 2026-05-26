import { Router } from "express";
import { BankController } from "../controllers/bank.controller";

const router = Router();

const bankController = new BankController();

router.get("/", bankController.getBanks);

router.get("/:id", bankController.getBankById);

router.post("/", bankController.createBank);

router.delete("/:id", bankController.deleteBank);

export default router;