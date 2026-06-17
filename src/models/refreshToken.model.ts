import db from '../config/database'
import { generateId } from '../utils/uuid'

const TABLE = 'refresh_tokens'

export interface RefreshTokenRecord {
  id: string
  tokenhash: string
  expired_at: Date
  revoked_at: Date | null
  created_at: Date
}

export const RefreshTokenModel = {
  async create(tokenhash: string, expiredAt: Date): Promise<RefreshTokenRecord> {
    const id = generateId()
    const payload = {
      id,
      tokenhash,
      expired_at: expiredAt,
      revoked_at: null,
      created_at: new Date()
    }
    
    await db(TABLE).insert(payload)
    
    return db(TABLE).where({ id }).first()
  },

  async findById(id: string): Promise<RefreshTokenRecord | undefined> {
    return db(TABLE).where({ id }).first()
  },

  async findByTokenHash(tokenhash: string): Promise<RefreshTokenRecord | undefined> {
    return db(TABLE).where({ tokenhash }).first()
  },

  async revokeToken(id: string): Promise<void> {
    await db(TABLE).where({ id }).update({
      revoked_at: new Date()
    })
  },

  async isTokenValid(id: string): Promise<boolean> {
    const token = await db(TABLE).where({ id }).first()
    
    if (!token) return false
    if (token.revoked_at) return false
    if (new Date() > token.expired_at) return false
    
    return true
  },

  async deleteExpiredTokens(): Promise<void> {
    await db(TABLE).where('expired_at', '<', new Date()).del()
  }
}
