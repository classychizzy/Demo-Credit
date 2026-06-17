export interface RefreshTokenRecord {
    id: string;
    tokenhash: string;
    expired_at: Date;
    revoked_at: Date | null;
    created_at: Date;
}
export declare const RefreshTokenModel: {
    create(tokenhash: string, expiredAt: Date): Promise<RefreshTokenRecord>;
    findById(id: string): Promise<RefreshTokenRecord | undefined>;
    findByTokenHash(tokenhash: string): Promise<RefreshTokenRecord | undefined>;
    revokeToken(id: string): Promise<void>;
    isTokenValid(id: string): Promise<boolean>;
    deleteExpiredTokens(): Promise<void>;
};
//# sourceMappingURL=refreshToken.model.d.ts.map