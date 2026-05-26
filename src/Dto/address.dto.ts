
export class CreateAddressDTO {
  user_id!: string;
  house_number!: string;
  town!: string;
  city!: string;
  state!: string;
  postal_code!: string;
}

export class AddressResponseDTO {
  id!: string;
  user_id!: string;
  house_number!: string;
  town!: string;
  city!: string;
  state!: string;
  postal_code!: string;
 
}