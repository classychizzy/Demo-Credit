export declare const KYCModel: {
    create(data: {
        user_id: string;
        account_number: string;
        bank_code: string;
        account_name: string;
        id_type: string;
        id_number: string;
        id_document_url: string;
        utility_bill_url: string;
    }): Promise<any>;
    findByUserId(user_id: string): Promise<any>;
    updateStatus(user_id: string, kyc_status: "pending" | "verified" | "failed", rejection_reason?: string): Promise<number>;
    updateKYC(user_id: string, data: Partial<{
        account_number: string;
        bank_code: string;
        account_name: string;
        id_type: string;
        id_number: string;
        id_document_url: string;
        utility_bill_url: string;
        bvn_verified: boolean;
        kyc_status: "pending" | "verified" | "failed";
        rejection_reason: string | null;
    }>): Promise<number>;
};
//# sourceMappingURL=kyc.model.d.ts.map