import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";         

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
 @IsString()
 @MinLength(8, { message: 'password must be at least 8 characters' })
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password!: string;
  @IsNotEmpty()
  @IsString()
   @Matches(/^(\+234|0)[789][01]\d{8}$/, {
    message: 'phone_number must be a valid Nigerian number',
  })
 
  phone_number: string;

  @IsEnum(['male', 'female', 'other'])
  gender: 'male' | 'female' | 'other';
  @IsString()
  @Length(11, 11, { message: 'bvn must be exactly 11 digits' })
  @Matches(/^\d+$/, { message: 'bvn must contain only numbers' })
  bvn: string;

 @IsNotEmpty()
@Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
  message: 'date_of_birth must be in YYYY-MM-DD format e.g 1998-01-26',
})
  date_of_birth: string;
  is_active: boolean;
  reset_token?: string | null;
  reset_token_expires_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
