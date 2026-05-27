import { CreateUserDTO } from "../../Dto/user/user.dto";
import { UserModel } from "../../models/user.model";
import { ResponseDto } from "../../Dto/response/response.dto";
import { UserResponse } from "../../types/userResponse";

import HttpException from "../../types/httpExceptions";


export class UsersService {
  private createUserDTO: typeof CreateUserDTO;
  private userModel: typeof UserModel;

  constructor(){
    this.userModel = UserModel;
    this.createUserDTO = CreateUserDTO;
  }

  async createUserService(data: CreateUserDTO) : Promise<ResponseDto<UserResponse>> {
    try {
      // check if user already exists
        const user = await this.userModel.findByEmail(data.email);
        console.log(user)

    
        if (!user) {
          const response:ResponseDto<UserResponse> = {
            status_code:400,
            success:false,
            message:"User already exists"
          }
          return response;
        }

        const newUser = await this.userModel.create(data);
        //const { bvn, reset_token, reset_token_expires_at, created_at, updated_at, password, ...userResponse} = newUser;
        const response:ResponseDto<UserResponse> = {
          status_code:201,
          success:true,
          message:"User created successfully",
          data: newUser
        };

        return response;
        
    } catch (error) {
      //throw http exception with status code and message
      throw error;
    }
  }

  async getUserByEmailService(email: string): Promise<ResponseDto<UserResponse> | null> {
    try {

      const user = await this.userModel.findByEmail(email);

      if (!user) {
          const response: ResponseDto<UserResponse> = {
            status_code:400,
            success:false,
            message:"User not found",
            error: null,
            data: user
          }
          return response;
      }

      const response: ResponseDto<UserResponse> = {
        status_code:400,
        success:false,
        message:"User not found",
        error: null,
        data: user
      }

      return response;

    } catch (error) {
      
      let errorMessage = 'An error occurred while fetching the user';  
      //get the real error message from the error object
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      //throw http exception with status code and message
      throw new HttpException(500, `Data not found:${errorMessage}`)
    }
  }

 async forgotPassword(email: string) {
  const reset_token = await UserModel.setResetToken(email);

  // TODO: send email with reset link
  // e.g. https://yourapp.com/reset-password?token=<reset_token>
  console.log(`Reset token for ${email}: ${reset_token}`); // replace with nodemailer

  return { message: 'Reset token sent to email' };
}

async changePassword(token: string, newPassword: string) {
  //authenticate the token and reset the password
  //implement rate limiting to prevent brute force attacks
  await UserModel.resetPassword(token, newPassword);
  return { message: 'Password reset successful' };
}

}