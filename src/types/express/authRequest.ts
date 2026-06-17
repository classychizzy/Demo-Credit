import { Request } from "express";
import type { userPayload } from "../userpayload";

export interface AuthenticatedRequest extends Request {
    user: userPayload;
}