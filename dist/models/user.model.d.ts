import { UserDTO } from '../Dto/user/User.dto';
import { RegisterUserDTO } from '../Dto/user/RegisterUser.dto';
export declare const UserModel: {
    create(data: RegisterUserDTO): Promise<UserDTO>;
    findAll(): Promise<UserDTO[]>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    updatePassword(id: string, newPassword: string): Promise<number>;
    setResetToken(email: string): Promise<{
        reset_token: string;
        reset_token_expires_at: Date;
    }>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<void>;
    findByEmail(email: string): Promise<UserDTO | undefined>;
    findById(id: string): Promise<UserDTO | undefined>;
    findByPhoneNumber(phone_number: string): Promise<UserDTO | undefined>;
    update(id: string, data: Partial<UserDTO>): Promise<UserDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=user.model.d.ts.map