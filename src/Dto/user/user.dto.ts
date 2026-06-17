export class UserDTO {
  id?: string
  first_name: string
  last_name: string
  email: string
  password: string
  phone_number: string
  gender: string
  bvn: string
  date_of_birth: string
  reset_token?: string | null
  reset_token_expires_at?: Date | null
  is_active: boolean
  kyc_status: 'pending' | 'verified' | 'rejected'
  created_at: Date
  updated_at: Date
}
