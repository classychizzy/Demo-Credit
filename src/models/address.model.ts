import { CreateAddressDTO, AddressResponseDTO } from "../Dto/address.dto";
import db from '../config/database'
import { generateId } from "../utils/uuid";


const TABLE = 'addresses';

export const AddressModel = {
  async create(data: CreateAddressDTO): Promise<AddressResponseDTO> {
    const id = generateId();
    const [address] = await db(TABLE).insert({id, ...data});
    return db(TABLE).where({ id }).first();
  },

  async findById(id: string): Promise<AddressResponseDTO | undefined> {
    return db(TABLE).where({ id }).first();
  },

  async findByUserId(user_id: string): Promise<AddressResponseDTO | undefined> {
    return db(TABLE).where({ user_id }).first();
  },

  async update(id: string, data: Partial<AddressResponseDTO>): Promise<AddressResponseDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() });
    return db(TABLE).where({ id }).first();
  },

  async delete(id: string): Promise<void> {
    await db(TABLE).where({ id }).delete();
  },
}