import { CreateAccountDTO, AccountResponseDTO } from "../Dto/account_dto";
export declare const AccountModel: {
    create(data: CreateAccountDTO): Promise<AccountResponseDTO>;
    findById(id: string): Promise<AccountResponseDTO | undefined>;
    findByUserId(user_id: string): Promise<AccountResponseDTO[] | undefined>;
    findByAccountNumber(account_number: string): Promise<AccountResponseDTO | undefined>;
    update(id: string, data: Partial<AccountResponseDTO>): Promise<AccountResponseDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=account_model.d.ts.map