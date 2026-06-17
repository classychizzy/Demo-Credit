export declare class KarmaService {
    private headers;
    /**
     * Returns true if the identity is found in the Karma blacklist.
     * Throws if the API is unreachable (fail-closed: block onboarding on uncertainty).
     */
    isBlacklisted(identity: string): Promise<boolean>;
}
//# sourceMappingURL=karma.service.d.ts.map