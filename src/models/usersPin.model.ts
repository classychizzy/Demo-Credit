import { CreateUsersPinDTO } from "../Dto/usersPin/usersPin.dto";
import db from '../config/database';
import { generateId } from "../utils/uuid";

const TABLE = 'users_pin';

export const UsersPinModel = {
  async create(data: CreateUsersPinDTO): Promise<CreateUsersPinDTO> {
    const id = generateId();
    await db(TABLE).insert({ id, ...data });
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<CreateUsersPinDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string): Promise<CreateUsersPinDTO | undefined> {
    return db(TABLE).where({ user_id }).first();
  },

  async update(id: string, data: Partial<CreateUsersPinDTO>): Promise<CreateUsersPinDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};
