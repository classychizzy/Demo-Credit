import jwt from "jsonwebtoken";
import { userPayload } from "../../types/userpayload";
// import dotenv from 'dotenv';
// dotenv.config();


export class TokenService {
  private readonly JWT_ACCESS_SECRET: string;
  private readonly JWT_REFRESH_SECRET: string;

  constructor() {

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT secrets are not defined in environment variables");
    }
    this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  }

  public generateAccessToken(user: userPayload) {
    return jwt.sign(user, this.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  }

  public generateRefreshToken(user: userPayload) {
    return jwt.sign(user, this.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  }

  public verifyAccessToken(token: string) {
    return jwt.verify(token, this.JWT_ACCESS_SECRET)

}

public verifyRefreshToken(token: string) {
  return jwt.verify(token, this.JWT_REFRESH_SECRET)

}
}