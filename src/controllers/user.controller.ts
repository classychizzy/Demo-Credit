import { UsersService } from "../services/auth/user.service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from '../types/express/authRequest';
import { loginDto } from "../Dto/user/Login.dto";

export class UserController {
  private userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  public async RegisterUserController(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);
      const response = await this.userService.RegisterUserService(data);
      return res.status(response.status_code).json(response);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "Internal server error",
      });
    }}

    public async findUserByEmailController(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await this.userService.getUserByEmailService(email);
      if (!response) {
        return res.status(500).json({
          status_code: 500,
          success: false,
          message: "Internal server error",
        });
      }
      return res.status(response.status_code).json(response);
    } catch (error) {
      console.error("Error finding user by email:", error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "Internal server error",
      });
    }}

    public async loginController(req: Request, res: Response) {
      try {
        const user = req.body as loginDto;
        const response = await this.userService.loginService(user);
        console.log(response);
        return res.status(response.status_code).json(response);
      } catch (error: any) {
        return res.status(400).json({
          status_code: 400,
          success: false,
          message: error.message || "An error occurred"
        });
      }
    }

  public async forgotPasswordController(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await this.userService.forgotPassword(email);
      return res.status(response.status_code).json(response);
    } catch (error: any) {
      return res.status(400).json({
        status_code: 400,
        success: false,
        message: error.message || "An error occurred"
      });
    }
  }

    public async changePasswordController(req: AuthenticatedRequest, res: Response) {
      try {
        const { old_password, new_password } = req.body;
        const id = req.user.id;
        const response = await this.userService.changePassword(id, old_password, new_password);
        return res.status(response.status_code).json(response);
      } catch (error: any) {
        return res.status(400).json({
          status_code: 400,
          success: false,
          message: error.message || "An error occurred"
        });
      }
    }

    public async resetPasswordController(req: Request, res: Response) {
      try {
        const { token, new_password } = req.body;
        const response = await this.userService.resetPassword(token, new_password);
        return res.status(200).json({
          status_code: 200,
          success: true,
          ...response
        });
      } catch (error: any) {
        return res.status(400).json({
          status_code: 400,
          success: false,
          message: error.message || "An error occurred"
        });
      }
    }

    public async refreshTokenController(req: Request, res: Response) {
      try {
        const { refresh_token } = req.body;
        const response = await this.userService.rotateRefreshToken(refresh_token);
        return res.status(response.status_code).json(response);
      } catch (error: any) {
        return res.status(500).json({
          status_code: 500,
          success: false,
          message: error.message || "Internal server error"
        });
      }
    }

    public async logoutController(req: Request, res: Response) {
      try {
        const { refresh_token } = req.body;
        const response = await this.userService.logoutService(refresh_token);
        return res.status(response.status_code).json(response);
      } catch (error: any) {
        return res.status(500).json({
          status_code: 500,
          success: false,
          message: error.message || "Internal server error"
        });
      }
    }

}