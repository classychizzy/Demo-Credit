import { Request, Response } from "express";
import { BankService } from "../services/bank/bank.service";

export class BankController {
  private bankService = new BankService();

  public getBanks = (
    req: Request,
    res: Response,
  ): void => {
    const banks = this.bankService.getAllBanks();

    res.status(200).json({
      success: true,
      message: "Banks retrieved successfully",
      data: banks,
    });
  };

  public getBankById = (
    req: Request,
    res: Response,
  ): void => {
    const bankId = req.params.id;

    if (!bankId || typeof bankId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid bank ID",
      });

      return;
    }

    const bank = this.bankService.getBankById(bankId);

    if (!bank) {
      res.status(404).json({
        success: false,
        message: "Bank not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Bank retrieved successfully",
      data: bank,
    });
  };

  public createBank = (
    req: Request,
    res: Response,
  ): void => {
    const bank = this.bankService.createBank(req.body);

    res.status(201).json({
      success: true,
      message: "Bank created successfully",
      data: bank,
    });
  };

  public deleteBank = (
    req: Request,
    res: Response,
  ): void => {
    const bankId = req.params.id;

    if (!bankId || typeof bankId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid bank ID",
      });

      return;
    }

    const deleted =
      this.bankService.deleteBank(bankId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Bank not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Bank deleted successfully",
    });
  };
}