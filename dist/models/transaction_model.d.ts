import { CreateTransactionDTO, TransactionResponseDTO } from "../Dto/transaction_dto";
export declare const TransactionModel: {
    create(data: CreateTransactionDTO): Promise<TransactionResponseDTO>;
    findById(id: string): Promise<TransactionResponseDTO | undefined>;
    findByAccountId(account_id: string): Promise<TransactionResponseDTO[]>;
    findByReference(transaction_reference: string): Promise<TransactionResponseDTO | undefined>;
    findBySessionId(session_id: string): Promise<TransactionResponseDTO | undefined>;
    update(id: string, data: Partial<TransactionResponseDTO>): Promise<TransactionResponseDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=transaction_model.d.ts.map