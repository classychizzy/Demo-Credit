import { CreateUserDTO, UserResponseDTO } from "../Dto/user.dto";
import db from '../config/database'
import { generateId } from "../utils/uuid";


const TABLE = 'users';

export const UserModel = {
  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const id = generateId();
    const [user] = await db(TABLE).insert({id, ...data});
    return db(TABLE).where({ id }).first();
  },


  async findByEmail(email: string): Promise<UserResponseDTO | undefined> {
    return db(TABLE).where({ email }).first();
  },

  async findById(id: string): Promise<UserResponseDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByPhoneNumber(phone_number: string): Promise<UserResponseDTO | undefined> {
    return db(TABLE).where({ phone_number }).first();
  },

  async update(id: string, data: Partial<UserResponseDTO>): Promise<UserResponseDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
};