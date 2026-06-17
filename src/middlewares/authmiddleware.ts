import { AuthenticatedRequest } from "../types/express/authRequest";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { userPayload } from "../types/userpayload";
import { ResponseDto } from "../Dto/response/response.dto";

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // const authheader = req.headers.'authorization

  // Debug logging
   // console.log('Raw Authorization Header:', JSON.stringify(authheader));
  
  //console.log('Authorization Header Length:' + authheader?.length); 

  const token = req.headers.authorization?.split(' ')[1];

  console.log('Extracted Token:', token);

  if (!token) {
    let response = {
      status_code: 401,
      status: 'failed',
      message: 'missing token',
      data: null

    }
    return res.status(401).json(response);

  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, decoded) => {
    if (err) {
      console.error('Invalid or expired token:');
      return res.status(403).json({
        status: "failed",
        message: "Invalid or expired token",
        data: null,
      });
    }

    req.user = decoded as userPayload; // ← THIS is what makes runtime work
    next();
  })


}

// Use this on wallet routes — blocks users who haven't completed KYC
export function requireKYC(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.user.kyc_status !== 'verified') {
    let response = new ResponseDto(403, false, 'Complete KYC verification to access this feature');
    return response;
    
  }
  next();
}