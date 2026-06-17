"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/auth/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UsersService();
    }
    async RegisterUserController(req, res) {
        try {
            const data = req.body;
            console.log(data);
            const response = await this.userService.RegisterUserService(data);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: "Internal server error",
            });
        }
    }
    async findUserByEmailController(req, res) {
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
        }
        catch (error) {
            console.error("Error finding user by email:", error);
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: "Internal server error",
            });
        }
    }
    async loginController(req, res) {
        try {
            const user = req.body;
            const response = await this.userService.loginService(user);
            console.log(response);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                message: error.message || "An error occurred"
            });
        }
    }
    async forgotPasswordController(req, res) {
        try {
            const { email } = req.body;
            const response = await this.userService.forgotPassword(email);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                message: error.message || "An error occurred"
            });
        }
    }
    async changePasswordController(req, res) {
        try {
            const { old_password, new_password } = req.body;
            const id = req.user.id;
            const response = await this.userService.changePassword(id, old_password, new_password);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                message: error.message || "An error occurred"
            });
        }
    }
    async resetPasswordController(req, res) {
        try {
            const { token, new_password } = req.body;
            const response = await this.userService.resetPassword(token, new_password);
            return res.status(200).json({
                status_code: 200,
                success: true,
                ...response
            });
        }
        catch (error) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                message: error.message || "An error occurred"
            });
        }
    }
    async refreshTokenController(req, res) {
        try {
            const { refresh_token } = req.body;
            const response = await this.userService.rotateRefreshToken(refresh_token);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: error.message || "Internal server error"
            });
        }
    }
    async logoutController(req, res) {
        try {
            const { refresh_token } = req.body;
            const response = await this.userService.logoutService(refresh_token);
            return res.status(response.status_code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                status_code: 500,
                success: false,
                message: error.message || "Internal server error"
            });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map