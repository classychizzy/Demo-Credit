import { ResponseDto } from '../../Dto/response/response.dto';
import { FundAccountDTO } from '../../Dto/wallet/fund.dto';
import { TransferDTO } from '../../Dto/wallet/transfer.dto';
import { WithdrawDTO } from '../../Dto/wallet/withdraw.dto';
export declare class WalletService {
    fundAccount(userId: string, data: FundAccountDTO): Promise<ResponseDto>;
    transferFunds(userId: string, data: TransferDTO): Promise<ResponseDto>;
    withdrawFunds(userId: string, data: WithdrawDTO): Promise<ResponseDto>;
}
//# sourceMappingURL=wallet.service.d.ts.map