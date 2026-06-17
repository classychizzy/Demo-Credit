
export class CreateAddressDTO {
  user_id!: string;
  street!: string;
  town!: string;
  city!: string;
  state!: string;
  postal_code!: string;
  created_at!: Date;
  updated_at!: Date;
}
