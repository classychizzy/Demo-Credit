import { CreateAccountDTO } from "../Dto/account/account.dto";
export declare const AccountModel: {
    create(data: CreateAccountDTO): Promise<CreateAccountDTO>;
    findById(id: string): Promise<CreateAccountDTO | undefined>;
    findByUserId(user_id: string): Promise<CreateAccountDTO[] | undefined>;
    findByAccountNumber(account_number: string): Promise<CreateAccountDTO | undefined>;
    update(id: string, data: Partial<CreateAccountDTO>): Promise<CreateAccountDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=account.model.d.ts.map