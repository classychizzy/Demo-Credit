
export type TransactionType = 'interbank' | 'intrabank' | 'self';

export class CreateTransactionDTO {
  account_id!: string;
  transaction_type!: TransactionType;
  beneficiary_name!: string;
  beneficiary_account_number!: string;
  beneficiary_bank!: string;
  session_id!: string;
  transaction_reference!: string;
  transaction_charges!: number;
  transaction_amount!: number;
  is_inflow!: boolean;
}

export class TransactionResponseDTO {
  id!: string;
  account_id!: string;
  transaction_type!: TransactionType;
  beneficiary_name!: string;
  beneficiary_account_number!: string;
  beneficiary_bank!: string;
  session_id!: string;
  transaction_reference!: string;
  transaction_charges!: number;
  transaction_amount!: number;
  is_inflow!: boolean;
  created_at!: Date;
  updated_at!: Date;
}
