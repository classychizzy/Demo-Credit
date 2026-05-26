import { CreateUsersPinDTO, UsersPinResponseDTO } from "../Dto/users_pin_dto";
import db from '../config/database';
import { generateId } from "../utils/uuid";

const TABLE = 'users_pin';

export const UsersPinModel = {
  async create(data: CreateUsersPinDTO): Promise<UsersPinResponseDTO> {
    const id = generateId();
    await db(TABLE).insert({ id, ...data });
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<UsersPinResponseDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string): Promise<UsersPinResponseDTO | undefined> {
    return db(TABLE).where({ user_id }).first();
  },

  async update(id: string, data: Partial<UsersPinResponseDTO>): Promise<UsersPinResponseDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};
