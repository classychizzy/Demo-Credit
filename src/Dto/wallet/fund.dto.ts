import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import {Type} from 'class-transformer'

export class FundAccountDTO {
  @IsNotEmpty()
  @IsString()
  account_number!: string

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(1, { message: 'amount must be at least 1' })
  amount!: number

  
}
