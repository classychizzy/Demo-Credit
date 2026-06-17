import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateDto } from "../middlewares/validate.Dto";
import { authenticateToken } from "../middlewares/authmiddleware";
import { loginRateLimiter } from "../middlewares/rateLimiter";
import { RegisterUserDTO } from '../Dto/user/RegisterUser.dto';
import { ForgotPasswordDTO } from "../Dto/user/forgotPassword.dto";
import { loginDto } from "../Dto/user/Login.dto";
import { RefreshTokenDTO } from "../Dto/user/refreshToken.dto";
import { ResetPasswordDTO } from "../Dto/user/ResetPassword.dto";
import { ChangePasswordDTO } from "../Dto/user/changePassword.dto";

const router = Router();
const userController = new UserController();

router.post("/register/me",validateDto(RegisterUserDTO),  userController.RegisterUserController.bind(userController));
router.post("/forgot-password", validateDto(ForgotPasswordDTO) ,userController.forgotPasswordController.bind(userController));
router.post("/login", loginRateLimiter, validateDto(loginDto), userController.loginController.bind(userController));
router.post("/refresh", validateDto(RefreshTokenDTO), userController.refreshTokenController.bind(userController));
router.post("/logout", validateDto(RefreshTokenDTO), userController.logoutController.bind(userController));
router.post("/reset-password", validateDto(ResetPasswordDTO), userController.resetPasswordController.bind(userController));
router.patch("/change-password", authenticateToken, validateDto(ChangePasswordDTO), userController.changePasswordController.bind(userController));

export default router;