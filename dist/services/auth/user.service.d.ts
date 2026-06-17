import { RegisterUserDTO } from '../../Dto/user/RegisterUser.dto';
import { ResponseDto } from '../../Dto/response/response.dto';
import { UserResponse } from '../../types/userResponse';
import { loginDto } from '../../Dto/user/Login.dto';
export declare class UsersService {
    private registerUserDTO;
    private loginDto;
    private userModel;
    private tokenService;
    private refreshTokenModel;
    private karmaService;
    constructor();
    RegisterUserService(data: RegisterUserDTO): Promise<ResponseDto<UserResponse>>;
    getUserByEmailService(email: string): Promise<ResponseDto<UserResponse> | null>;
    loginService(loginDto: loginDto): Promise<ResponseDto<UserResponse>>;
    forgotPassword(email: string): Promise<ResponseDto<UserResponse>>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<ResponseDto<UserResponse>>;
    rotateRefreshToken(refreshToken: string): Promise<ResponseDto<UserResponse>>;
    logoutService(refreshToken: string): Promise<ResponseDto<UserResponse>>;
}
//# sourceMappingURL=user.service.d.ts.map