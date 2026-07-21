import db from '../config/database';
import { generateId } from "../utils/uuid";

type PinRecord = {
  id?: string
  user_id: string
  pin: string
  created_at?: Date
  updated_at?: Date
}

const TABLE = 'users_pin';

export const UsersPinModel = {
  async create(data: Omit<PinRecord, 'id'>): Promise<PinRecord> {
    const id = generateId();
    await db(TABLE).insert({ id, ...data });
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<PinRecord | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string): Promise<PinRecord | undefined> {
    return db(TABLE).where({ user_id }).first();
  },

  async update(id: string, data: Partial<PinRecord>): Promise<PinRecord> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};
