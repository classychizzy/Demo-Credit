import { CreateUserDTO } from '../Dto/user/RegisterUser.dto';
export interface UserRecord extends CreateUserDTO {
    id: string;
    is_active: boolean;
    kyc_status: 'pending' | 'verified' | 'failed';
    refresh_token: string | null;
    reset_token: string | null;
    reset_token_expires_at: Date | null;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=userRecord.d.ts.map