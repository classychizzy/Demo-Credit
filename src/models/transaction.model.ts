import { CreateTransactionDTO } from "../Dto/transaction/transaction.dto";
import db from '../config/database';
import { generateId } from "../utils/uuid";

const TABLE = 'transactions';

export const TransactionModel = {
  async create(data: CreateTransactionDTO): Promise<CreateTransactionDTO> {
    const id = generateId();
    await db(TABLE).insert({ id, ...data });
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<CreateTransactionDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByAccountId(account_id: string): Promise<CreateTransactionDTO[]> {
    return db(TABLE).where({ account_id });
  },

  async findByReference(transaction_reference: string): Promise<CreateTransactionDTO | undefined> {
    return db(TABLE).where({ transaction_reference }).first();
  },

  async findBySessionId(session_id: string): Promise<CreateTransactionDTO | undefined> {
    return db(TABLE).where({ session_id }).first();
  },

  async update(id: string, data: Partial<CreateTransactionDTO>): Promise<CreateTransactionDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};
