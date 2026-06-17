import { IsNotEmpty, IsNumber, IsString, Length, Matches, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class InterbankTransferDTO {
  @IsNotEmpty()
  @IsString()
  source_account_number!: string

  @IsNotEmpty()
  @IsString()
  destination_account_number!: string

  @IsNotEmpty()
  @IsString()
  destination_account_name!: string

  @IsNotEmpty()
  @IsString()
  destination_bank_name!: string

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(1, { message: 'amount must be at least 1' })
  amount!: number

  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: 'PIN must be exactly 4 digits' })
  @Matches(/^\d{4}$/, { message: 'PIN must contain only digits' })
  pin!: string
}