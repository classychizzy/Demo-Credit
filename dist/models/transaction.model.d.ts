import { CreateTransactionDTO } from "../Dto/transaction/transaction.dto";
export declare const TransactionModel: {
    create(data: CreateTransactionDTO): Promise<CreateTransactionDTO>;
    findById(id: string): Promise<CreateTransactionDTO | undefined>;
    findByAccountId(account_id: string): Promise<CreateTransactionDTO[]>;
    findByReference(transaction_reference: string): Promise<CreateTransactionDTO | undefined>;
    findBySessionId(session_id: string): Promise<CreateTransactionDTO | undefined>;
    update(id: string, data: Partial<CreateTransactionDTO>): Promise<CreateTransactionDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=transaction.model.d.ts.map