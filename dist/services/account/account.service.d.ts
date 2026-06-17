import { ResponseDto } from '../../Dto/response/response.dto';
import { CreateAccountRequestDTO } from '../../Dto/account/createAccount.request.dto';
import { CreateAccountDTO } from '../../Dto/account/account.dto';
export declare class AccountService {
    private accountModel;
    private userModel;
    constructor();
    createAccount(userId: string, data: CreateAccountRequestDTO): Promise<ResponseDto<CreateAccountDTO>>;
    getMyAccounts(userId: string): Promise<ResponseDto<CreateAccountDTO[]>>;
    getAccountByNumber(accountNumber: string): Promise<ResponseDto<CreateAccountDTO>>;
}
//# sourceMappingURL=account.service.d.ts.map