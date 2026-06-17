import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyKYCDTO {
  // bank details
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Account number must be exactly 10 digits' })
  account_number!: string;

  @IsString()
  @IsNotEmpty()
  bank_code!: string;

  // government ID
  @IsEnum(['nin', 'drivers_license', 'voters_card', 'international_passport'], {
    message: 'id_type must be one of: nin, drivers_license, voters_card, international_passport',
  })
  id_type!: 'nin' | 'drivers_license' | 'voters_card' | 'international_passport';

  @IsString()
  @IsNotEmpty()
  id_number!: string;

  // document URLs — in production these would be 
  // uploaded to cloudinary/S3 first, then URL sent here
  @IsString()
  @IsNotEmpty()
  id_document_url!: string;

  @IsString()
  @IsNotEmpty()
  utility_bill_url!: string;
}