"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarmaService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ADJUTOR_BASE_URL = 'https://adjutor.lendsqr.com/v2/verification/karma';
const ADJUTOR_API_KEY = process.env.ADJUTOR_API_KEY;
class KarmaService {
    headers() {
        return {
            Authorization: `Bearer ${ADJUTOR_API_KEY}`,
            'Content-Type': 'application/json',
        };
    }
    /**
     * Returns true if the identity is found in the Karma blacklist.
     * Throws if the API is unreachable (fail-closed: block onboarding on uncertainty).
     */
    async isBlacklisted(identity) {
        // Skip check when API key is not configured — allows local dev without the key
        if (!ADJUTOR_API_KEY || ADJUTOR_API_KEY === 'your_adjutor_api_key_here') {
            console.warn(`[KarmaService] ADJUTOR_API_KEY not set — skipping blacklist check for ${identity}`);
            return false;
        }
        try {
            const response = await axios_1.default.get(`${ADJUTOR_BASE_URL}/${encodeURIComponent(identity)}`, { headers: this.headers() });
            // A 200 with a data payload means the identity is in the blacklist
            return response.status === 200 && response.data?.data !== null;
        }
        catch (error) {
            // 404 means identity was not found in the blacklist — user is clean
            if (axios_1.default.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            // Re-throw all other errors (network issues, 401, etc.) to fail-closed
            throw new Error(`Karma blacklist check failed: ${error?.message ?? 'Unknown error'}`);
        }
    }
}
exports.KarmaService = KarmaService;
//# sourceMappingURL=karma.service.js.map