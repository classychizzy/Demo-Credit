import { CreateUserDTO, UserResponseDTO } from "../Dto/user_dto";
export declare const UserModel: {
    create(data: CreateUserDTO): Promise<UserResponseDTO>;
    findByEmail(email: string): Promise<UserResponseDTO | undefined>;
    findById(id: string): Promise<UserResponseDTO | undefined>;
    findByPhoneNumber(phone_number: string): Promise<UserResponseDTO | undefined>;
    update(id: string, data: Partial<UserResponseDTO>): Promise<UserResponseDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=user_model.d.ts.map