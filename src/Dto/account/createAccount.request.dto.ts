import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateAccountRequestDTO {
  @IsNotEmpty()
  @IsEnum(['savings', 'current', 'wallet'], { message: 'account_type must be savings, current, or wallet' })
  account_type!: 'savings' | 'current' | 'wallet'

 
}
