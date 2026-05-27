import { CreateAccountDTO } from "../Dto/account/account.dto";
import db from '../config/database';
import { generateId } from "../utils/uuid";


const TABLE = 'accounts';

export const AccountModel = {
  async create(data: CreateAccountDTO): Promise<CreateAccountDTO> {
    const id = generateId();
    await db(TABLE).insert({ id, ...data });
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<CreateAccountDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string): Promise<CreateAccountDTO[] | undefined> {
    return db(TABLE).where({ user_id });
  },

  async findByAccountNumber(account_number: string): Promise<CreateAccountDTO | undefined> {
    return db(TABLE).where({ account_number }).first();
  },

  async update(id: string, data: Partial<CreateAccountDTO>): Promise<CreateAccountDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};
