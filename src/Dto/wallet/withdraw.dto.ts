import { IsNotEmpty, IsNumber, IsString, Length, Matches, Min } from 'class-validator'

export class WithdrawDTO {
  @IsNotEmpty()
  @IsString()
  account_number!: string

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1, { message: 'amount must be at least 1' })
  amount!: number

  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: 'PIN must be exactly 4 digits' })
  @Matches(/^\d{4}$/, { message: 'PIN must contain only digits' })
  pin!: string
}
