export interface Bank {
  bankId: string;
  bankName: string;
  bankCode: string;
  swiftCode: string;
  country: string;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}