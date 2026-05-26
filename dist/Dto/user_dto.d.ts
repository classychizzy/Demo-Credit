export declare class CreateUserDTO {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: 'male' | 'female' | 'other';
    bvn: string;
    date_of_birth: string;
}
export declare class UserResponseDTO {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: 'male' | 'female' | 'other';
    bvn: number;
    date_of_birth: string;
    is_active: boolean;
    reset_token: string | null;
    reset_token_expires_at: Date | null;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=user_dto.d.ts.map