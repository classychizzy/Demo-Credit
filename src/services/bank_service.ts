import axios from 'axios';


interface Bank {
  name: string;
  code: string;
  slug: string;
}

export const BankService = {
  async getBanks(): Promise<Bank[]> {
    const response = await axios.get('https://api.paystack.co/bank', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      params: {
        country: 'nigeria',
        use_cursor: true,
        perPage: 100,
      },
    });
    return response.data.data;
  },

  async verifyAccountNumber(account_number: string, bank_code: string) {
    const response = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response.data.data;
  },
};