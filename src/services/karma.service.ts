import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const ADJUTOR_BASE_URL = 'https://adjutor.lendsqr.com/v2/verification/karma'
const ADJUTOR_API_KEY = process.env.ADJUTOR_API_KEY

export class KarmaService {
  private headers() {
    return {
      Authorization: `Bearer ${ADJUTOR_API_KEY}`,
     'Content-Type': 'application/json',
    }
  }

  /**
   * Returns true if the identity is found in the Karma blacklist.
   * Throws if the API is unreachable (fail-closed: block onboarding on uncertainty).
   */
  async isBlacklisted(identity: string): Promise<boolean> {
    // Skip check when API key is not configured — allows local dev without the key
    if (!ADJUTOR_API_KEY || ADJUTOR_API_KEY === 'your_adjutor_api_key_here') {
      console.warn(`[KarmaService] ADJUTOR_API_KEY not set — skipping blacklist check for ${identity}`)
      return false
    }

    try {
      const response = await axios.get(
        `${ADJUTOR_BASE_URL}/${encodeURIComponent(identity)}`,
        { headers: this.headers() }
      )
      // A 200 with a data payload means the identity is in the blacklist
      return response.status === 200 && response.data?.data !== null
    } catch (error: any) {
      // 404 means identity was not found in the blacklist — user is clean
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false
      }
      // Re-throw all other errors (network issues, 401, etc.) to fail-closed
      throw new Error(
        `Karma blacklist check failed: ${error?.message ?? 'Unknown error'}`
      )
    }
  }
}
