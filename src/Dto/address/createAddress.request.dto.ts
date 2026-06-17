import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAddressRequestDTO {
  @IsNotEmpty()
  @IsString()
  street!: string

  @IsNotEmpty()
  @IsString()
  town!: string

  @IsNotEmpty()
  @IsString()
  city!: string

  @IsNotEmpty()
  @IsString()
  state!: string

  @IsNotEmpty()
  @IsString()
  postal_code!: string

  @IsNotEmpty()
  @IsString()
  country!: string
}
