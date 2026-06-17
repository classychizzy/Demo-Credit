"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const RegisterUser_dto_1 = require("../../Dto/user/RegisterUser.dto");
const user_model_1 = require("../../models/user.model");
const token_service_1 = require("./token.service");
const httpExceptions_1 = __importDefault(require("../../types/httpExceptions"));
const karma_service_1 = require("../karma.service");
const dotenv_1 = __importDefault(require("dotenv"));
const Login_dto_1 = require("../../Dto/user/Login.dto");
const refreshToken_model_1 = require("../../models/refreshToken.model");
dotenv_1.default.config();
class UsersService {
    constructor() {
        this.userModel = user_model_1.UserModel;
        this.registerUserDTO = RegisterUser_dto_1.RegisterUserDTO;
        this.loginDto = Login_dto_1.loginDto;
        this.tokenService = new token_service_1.TokenService();
        this.refreshTokenModel = refreshToken_model_1.RefreshTokenModel;
        this.karmaService = new karma_service_1.KarmaService();
    }
    async RegisterUserService(data) {
        try {
            // Check Karma blacklist — email and BVN are checked independently
            const identitiesToCheck = [data.email, data.bvn].filter(Boolean);
            for (const identity of identitiesToCheck) {
                const blacklisted = await this.karmaService.isBlacklisted(identity);
                if (blacklisted) {
                    return {
                        status_code: 403,
                        success: false,
                        message: 'User cannot be onboarded due to a compliance restriction'
                    };
                }
            }
            // check if user already exists
            const ExistingUser = await this.userModel.findByEmail(data.email);
            if (ExistingUser) {
                const response = {
                    status_code: 409,
                    success: false,
                    message: 'User already exists'
                };
                return response;
            }
            const newUser = await this.userModel.create(data);
            const { bvn, password, reset_token, reset_token_expires_at, ...userResponse } = newUser;
            const response = {
                status_code: 200,
                success: true,
                message: 'User created successfully',
                data: newUser
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByEmailService(email) {
        try {
            const user = await this.userModel.findByEmail(email);
            if (!user) {
                const response = {
                    status_code: 400,
                    success: false,
                    message: 'User not found',
                    error: null,
                    data: user
                };
                return response;
            }
            const response = {
                status_code: 400,
                success: false,
                message: 'User not found',
                error: null
            };
            return response;
        }
        catch (error) {
            let errorMessage = 'An error occurred while fetching the user';
            //get the real error message from the error object
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            //throw http exception with status code and message
            throw new httpExceptions_1.default(500, `Data not found:${errorMessage}`);
        }
    }
    async loginService(loginDto) {
        try {
            const user = await this.userModel.findByEmail(loginDto.email);
            const userPassword = loginDto.password;
            if (!user) {
                const response = {
                    status_code: 400,
                    success: false,
                    message: 'User not found',
                    error: null,
                    data: user
                };
                return response;
            }
            console.log(user);
            const isPasswordValid = await this.userModel.comparePassword(userPassword, user.password);
            if (!isPasswordValid) {
                const response = {
                    status_code: 400,
                    success: false,
                    message: 'Invalid password',
                    error: null
                };
                return response;
            }
            const payload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                is_active: user.is_active,
                kyc_status: user.kyc_status
            };
            const accessToken = await this.tokenService.generateAccessToken(payload);
            const refreshToken = await this.tokenService.generateRefreshToken(payload);
            // Store the newly issued refresh token — always create on login
            await this.refreshTokenModel.create(refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
            const { bvn, password, reset_token, reset_token_expires_at, ...userResponse } = user;
            const Logindata = {
                ...userResponse,
                access_token: accessToken,
                refresh_token: refreshToken
            };
            const response = {
                status_code: 200,
                success: true,
                message: 'Login successful',
                error: null,
                data: Logindata
            };
            return response;
        }
        catch (error) {
            let errorMessage = 'An error occurred during login';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status_code: 500,
                success: false,
                message: errorMessage
            };
            return response;
        }
    }
    async forgotPassword(email) {
        const token_data = await user_model_1.UserModel.setResetToken(email);
        const reset_token = token_data.reset_token;
        console.log('Generated reset token:', reset_token); // Debugging log
        const resetLink = `http://localhost:3000/reset-password?token=${reset_token}`;
        console.log(`Reset token for ${email}: ${reset_token}`); // replace with nodemailer
        console.log('PASSWORD RESET LINK');
        console.log(resetLink);
        const response = {
            status_code: 200,
            success: true,
            message: 'Password reset link sent to your email',
            error: null
        };
        return response;
    }
    async resetPassword(token, newPassword) {
        //authenticate the token and reset the password
        //implement rate limiting to prevent brute force attacks
        await user_model_1.UserModel.resetPassword(token, newPassword);
        return { message: 'Password reset successful' };
    }
    async changePassword(id, oldPassword, newPassword) {
        //implement rate limiting to prevent brute force attacks
        // implement check to ensure the user is authenticated and authorized to change the password
        const user = await user_model_1.UserModel.findById(id);
        if (!user) {
            const response = {
                status_code: 404,
                success: false,
                message: 'User not found',
                error: null
            };
            return response;
        }
        //check if user is active
        if (!user.is_active) {
            const response = {
                status_code: 403,
                success: false,
                message: 'User is not active',
                error: null
            };
            return response;
        }
        const isOldPasswordValid = await user_model_1.UserModel.comparePassword(oldPassword, user.password);
        if (!isOldPasswordValid) {
            const response = {
                status_code: 400,
                success: false,
                message: 'Old password is incorrect',
                error: null
            };
            return response;
        }
        await user_model_1.UserModel.changePassword(id, oldPassword, newPassword);
        const response = {
            status_code: 200,
            success: true,
            message: 'Password change successful',
            error: null
        };
        return response;
    }
    async rotateRefreshToken(refreshToken) {
        const tokenRecord = await this.refreshTokenModel.findByTokenHash(refreshToken);
        if (!tokenRecord) {
            const response = {
                status_code: 401,
                success: false,
                message: 'Invalid refresh token'
            };
            return response;
        }
        const isValid = await this.refreshTokenModel.isTokenValid(tokenRecord.id);
        if (!isValid) {
            return {
                status_code: 401,
                success: false,
                message: 'Refresh token has expired or been revoked'
            };
        }
        let decoded;
        try {
            decoded = this.tokenService.verifyRefreshToken(refreshToken);
            // this check is crucial to ensure the token's payload corresponds to an existing user, preventing token reuse after user deletion or deactivation
            // If the user no longer exists or is inactive, we should not issue new tokens
            const user = await this.userModel.findById(decoded.id);
            if (!user) {
                return {
                    status_code: 404,
                    success: false,
                    message: 'User not found'
                };
            }
        }
        catch {
            return {
                status_code: 401,
                success: false,
                message: 'Invalid refresh token'
            };
        }
        // Revoke the used token before issuing new ones (rotation)
        await this.refreshTokenModel.revokeToken(tokenRecord.id);
        const payload = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            is_active: decoded.is_active,
            kyc_status: decoded.kyc_status
        };
        const newAccessToken = this.tokenService.generateAccessToken(payload);
        const newRefreshToken = this.tokenService.generateRefreshToken(payload);
        await this.refreshTokenModel.create(newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        return {
            status_code: 200,
            success: true,
            message: 'Token refreshed successfully',
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken
            }
        };
    }
    async logoutService(refreshToken) {
        const tokenRecord = await this.refreshTokenModel.findByTokenHash(refreshToken);
        if (!tokenRecord) {
            return {
                status_code: 400,
                success: false,
                message: 'Invalid or already revoked token'
            };
        }
        await this.refreshTokenModel.revokeToken(tokenRecord.id);
        return {
            status_code: 200,
            success: true,
            message: 'Logged out successfully'
        };
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map