import { UsersService } from "../services/auth/user_service";
import { Request, Response } from "express";
import { validateDto } from "../middlewares/validate.Dto";

export class UserController {
  private userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  public async createUserController(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);
      const response = await this.userService.createUserService(data);
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

  public async forgotPasswordController(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await this.userService.forgotPassword(email);
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
}}