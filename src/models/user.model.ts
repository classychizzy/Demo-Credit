import { UserDTO } from '../Dto/user/User.dto'
//import { CreateUserDTO } from '../Dto/user/RegisterUser.dto
import db from '../config/database'

import { generateId } from '../utils/uuid'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { RegisterUserDTO } from '../Dto/user/RegisterUser.dto'

const TABLE = 'users'

export const UserModel = {
  async create (data: RegisterUserDTO): Promise<UserDTO> {
    const id = generateId()
    const hashedPassword = await bcrypt.hash(data.password, 10)
    data.password = hashedPassword
    await db(TABLE).insert({ id, ...data })

    return db(TABLE)
      .where({ id })
      .select(
        'email',
        'id',
        'first_name',
        'last_name',
        'phone_number',
        'gender',
        'date_of_birth',
        'is_active'
      )
  },

  async findAll (): Promise<UserDTO[]> {
    return db(TABLE).select()
  },

  async comparePassword (plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword)
  },

  async updatePassword (id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    return db('users').where({ id }).update({
      password: hashedPassword,
      updated_at: new Date()
    })
  },

  async setResetToken (email: string) {
    const user = await db(TABLE).where({ email }).first()
    if (!user) throw new Error('User with this email does not exist')

    const reset_token = crypto.randomBytes(32).toString('hex') // random token
    const reset_token_expires_at = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    await db(TABLE).where({ email }).update({
      reset_token,
      reset_token_expires_at,
      updated_at: new Date()
    })

    return { reset_token, reset_token_expires_at }
  },

  async resetPassword (token: string, newPassword: string) {
    // find user by token and check it hasn't expired
    const user = await db(TABLE)
      .where({ reset_token: token })
      .andWhere('reset_token_expires_at', '>', new Date()) // not expired
      .first()

    if (!user) throw new Error('Invalid or expired reset token')

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db(TABLE).where({ id: user.id }).update({
      password: hashedPassword,
      reset_token: null, // clear token after use
      reset_token_expires_at: null,
      updated_at: new Date()
    })
  },

  async changePassword (id: string, oldPassword: string, newPassword: string) {
    const user = await db(TABLE).where({ id }).first()
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) throw new Error('Old password is incorrect')

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await db(TABLE).where({ id }).update({
      password: hashedPassword,
      updated_at: new Date()
    })
  },

  async findByEmail (email: string): Promise<UserDTO | undefined> {
    return db(TABLE)
      .where({ email })
      .first()
      .select(
        'email',
        'id',
        'first_name',
        'last_name',
        'phone_number',
        'gender',
        'date_of_birth',
        'password',
        'is_active'
      )
  },

  async findById (id: string): Promise<UserDTO | undefined> {
    return db(TABLE)
      .where({ id })
      .first()
      .select(
        'email',
        'id',
        'first_name',
        'last_name',
        'phone_number',
        'gender',
        'date_of_birth',
        'is_active'
      )
  },

  async findByPhoneNumber (phone_number: string): Promise<UserDTO | undefined> {
    return db(TABLE).where({ phone_number }).first()
  },

  async update (id: string, data: Partial<UserDTO>): Promise<UserDTO> {
    await db(TABLE)
      .where({ id })
      .update({ ...data, updated_at: new Date() })
    return db(TABLE).where({ id }).first()
  },

  async delete (id: string): Promise<void> {
    await db(TABLE).where({ id }).delete()
  }
}
