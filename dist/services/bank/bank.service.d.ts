import { Bank } from "../../data/bank.dto";
import { ResponseDto } from "../../Dto/response/response.dto";
export declare class BankService {
    private banks;
    getAllBanks(): ResponseDto<Bank[]>;
    getBankById(bankId: string): Bank | undefined;
    createBank(bank: Bank): Bank;
    deleteBank(bankId: string): boolean;
}
//# sourceMappingURL=bank.service.d.ts.map