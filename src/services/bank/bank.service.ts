import { Bank } from "../../data/bank.dto";
import { banks } from "../../data/bank";
import { ResponseDto } from "../../Dto/response/response.dto";


export class BankService {
  private banks: Bank[] = banks;

  public getAllBanks(): ResponseDto<Bank[]> {
    try {
        const response: ResponseDto<Bank[]> = {
            status_code: 200,
            success: true,
            message: "Banks retrieved successfully",
            data: this.banks,
        };
        return response;
    } catch (error) {
        const response: ResponseDto<Bank[]> = {
            status_code: 500,
            success: false,
            message: "Internal server error",
            error: error,
        };
        return response;
    }
  }

  public getBankById(bankId: string): Bank | undefined {
    return this.banks.find((bank) => bank.bankId === bankId);
  }

  public createBank(bank: Bank): Bank {
    this.banks.push(bank);
    return bank;
  }

  public deleteBank(bankId: string): boolean {
    const index = this.banks.findIndex(
      (bank) => bank.bankId === bankId,
    );

    if (index === -1) {
      return false;
    }

    this.banks.splice(index, 1);

    return true;
  }
}