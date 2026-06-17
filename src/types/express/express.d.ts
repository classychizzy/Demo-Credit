import { userPayload } from "../userpayload";



declare global {
  namespace Express {
    interface Request {
      user: userPayload; // optional on base Request
    }
  }
}
export {};