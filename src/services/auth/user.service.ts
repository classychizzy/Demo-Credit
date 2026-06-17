import { RegisterUserDTO } from '../../Dto/user/RegisterUser.dto'
import { UserModel } from '../../models/user.model'
import { ResponseDto } from '../../Dto/response/response.dto'
import { UserResponse } from '../../types/userResponse'
import { TokenService } from './token.service'
import HttpException from '../../types/httpExceptions'
import { userPayload } from '../../types/userpayload'
import { KarmaService } from '../karma.service'

import dotenv from 'dotenv'
import { loginDto } from '../../Dto/user/Login.dto'
import { RefreshTokenModel } from '../../models/refreshToken.model'

dotenv.config()

export class UsersService {
  private registerUserDTO: typeof RegisterUserDTO
  private loginDto: typeof loginDto
  private userModel: typeof UserModel
  private tokenService: TokenService
  private refreshTokenModel: typeof RefreshTokenModel
  private karmaService: KarmaService

  constructor () {
    this.userModel = UserModel
    this.registerUserDTO = RegisterUserDTO
    this.loginDto = loginDto
    this.tokenService = new TokenService()
    this.refreshTokenModel = RefreshTokenModel
    this.karmaService = new KarmaService()
  }

  async RegisterUserService (
    data: RegisterUserDTO
  ): Promise<ResponseDto<UserResponse>> {
    try {
      // Check Karma blacklist — email and BVN are checked independently
      const identitiesToCheck = [data.email, data.bvn].filter(Boolean)
      for (const identity of identitiesToCheck) {
        const blacklisted = await this.karmaService.isBlacklisted(identity)
        if (blacklisted) {
          return {
            status_code: 403,
            success: false,
            message: 'User cannot be onboarded due to a compliance restriction'
          }
        }
      }

      // check if user already exists
      const ExistingUser = await this.userModel.findByEmail(data.email)

      if (ExistingUser) {
        const response: ResponseDto<UserResponse> = {
          status_code: 409,
          success: false,
          message: 'User already exists'
        }
        return response
      }

      const newUser = await this.userModel.create(data)
      const {
        bvn,
        password,
        reset_token,
        reset_token_expires_at,
        ...userResponse
      } = newUser
      const response: ResponseDto<UserResponse> = {
        status_code: 200,
        success: true,
        message: 'User created successfully',
        data: newUser
      }

      return response
    } catch (error) {
      throw error
    }
  }

  async getUserByEmailService (
    email: string
  ): Promise<ResponseDto<UserResponse> | null> {
    try {
      const user = await this.userModel.findByEmail(email)

      if (!user) {
        const response: ResponseDto<UserResponse> = {
          status_code: 400,
          success: false,
          message: 'User not found',
          error: null,
          data: user
        }
        return response
      }

      const response: ResponseDto<UserResponse> = {
        status_code: 400,
        success: false,
        message: 'User not found',
        error: null
      }

      return response
    } catch (error) {
      let errorMessage = 'An error occurred while fetching the user'
      //get the real error message from the error object
      if (error instanceof Error) {
        errorMessage = error.message
      }

      //throw http exception with status code and message
      throw new HttpException(500, `Data not found:${errorMessage}`)
    }
  }

  async loginService (loginDto: loginDto): Promise<ResponseDto<UserResponse>> {
    try {
      const user = await this.userModel.findByEmail(loginDto.email)
      const userPassword = loginDto.password

      if (!user) {
        const response: ResponseDto<UserResponse> = {
          status_code: 400,
          success: false,
          message: 'User not found',
          error: null,
          data: user
        }
        return response
      }

      console.log(user)
      const isPasswordValid = await this.userModel.comparePassword(
        userPassword,
        user.password
      )

      if (!isPasswordValid) {
        const response: ResponseDto<UserResponse> = {
          status_code: 400,
          success: false,
          message: 'Invalid password',
          error: null
        }
        return response
      }

      const payload: userPayload = {
        id: user.id!!,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: user.is_active,
        kyc_status: user.kyc_status
      }

      const accessToken = await this.tokenService.generateAccessToken(payload)
      const refreshToken = await this.tokenService.generateRefreshToken(payload)

      // Store the newly issued refresh token — always create on login
      await this.refreshTokenModel.create(
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      )
      const {
        bvn,
        password,
        reset_token,
        reset_token_expires_at,
        ...userResponse
      } = user

      const Logindata = {
        ...userResponse,
        access_token: accessToken,
        refresh_token: refreshToken
      }

      const response: ResponseDto<UserResponse> = {
        status_code: 200,
        success: true,
        message: 'Login successful',
        error: null,
        data: Logindata
      }

      return response
    } catch (error) {
      let errorMessage = 'An error occurred during login'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      const response: ResponseDto<UserResponse> = {
        status_code: 500,
        success: false,
        message: errorMessage
      }
      return response
    }
  }

  async forgotPassword (email: string) {
    const token_data = await UserModel.setResetToken(email)
    const reset_token = token_data.reset_token
    console.log('Generated reset token:', reset_token) // Debugging log

    const resetLink = `http://localhost:3000/reset-password?token=${reset_token}`

    console.log(`Reset token for ${email}: ${reset_token}`) // replace with nodemailer
    console.log('PASSWORD RESET LINK')
    console.log(resetLink)

    const response: ResponseDto<UserResponse> = {
      status_code: 200,
      success: true,
      message: 'Password reset link sent to your email',
      error: null
    }
    return response
  }

  async resetPassword (token: string, newPassword: string) {
    //authenticate the token and reset the password
    //implement rate limiting to prevent brute force attacks
    await UserModel.resetPassword(token, newPassword)
    return { message: 'Password reset successful' }
  }

  async changePassword (id: string, oldPassword: string, newPassword: string) {
    //implement rate limiting to prevent brute force attacks
    // implement check to ensure the user is authenticated and authorized to change the password

    const user = await UserModel.findById(id)

    if (!user) {
      const response: ResponseDto<UserResponse> = {
        status_code: 404,
        success: false,
        message: 'User not found',
        error: null
      }
      return response
    }

    //check if user is active
    if (!user.is_active) {
      const response: ResponseDto<UserResponse> = {
        status_code: 403,
        success: false,
        message: 'User is not active',
        error: null
      }
      return response
    }

    const isOldPasswordValid = await UserModel.comparePassword(
      oldPassword,
      user.password
    )

    if (!isOldPasswordValid) {
      const response: ResponseDto<UserResponse> = {
        status_code: 400,
        success: false,
        message: 'Old password is incorrect',
        error: null
      }
      return response
    }

    await UserModel.changePassword(id, oldPassword, newPassword)
    const response: ResponseDto<UserResponse> = {
      status_code: 200,
      success: true,
      message: 'Password change successful',
      error: null
    }
    return response
  }

  async rotateRefreshToken (
    refreshToken: string
  ): Promise<ResponseDto<UserResponse>> {
    const tokenRecord = await this.refreshTokenModel.findByTokenHash(
      refreshToken
    )

    if (!tokenRecord) {
      const response: ResponseDto<UserResponse> = {
        status_code: 401,
        success: false,
        message: 'Invalid refresh token'
      }
      return response
    }

    const isValid = await this.refreshTokenModel.isTokenValid(tokenRecord.id)

    if (!isValid) {
      return {
        status_code: 401,
        success: false,
        message: 'Refresh token has expired or been revoked'
      }
    }

    let decoded: userPayload
    try {
      decoded = this.tokenService.verifyRefreshToken(
        refreshToken
      ) as userPayload
      // this check is crucial to ensure the token's payload corresponds to an existing user, preventing token reuse after user deletion or deactivation
      // If the user no longer exists or is inactive, we should not issue new tokens
      const user = await this.userModel.findById(decoded.id)

      if (!user) {
        return {
          status_code: 404,
          success: false,
          message: 'User not found'
        }
      }
    } catch {
      return {
        status_code: 401,
        success: false,
        message: 'Invalid refresh token'
      }
    }

    // Revoke the used token before issuing new ones (rotation)
    await this.refreshTokenModel.revokeToken(tokenRecord.id)

    const payload: userPayload = {
      id: decoded.id,
      email: decoded.email,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      is_active: decoded.is_active,
      kyc_status: decoded.kyc_status
    }

    const newAccessToken = this.tokenService.generateAccessToken(payload)
    const newRefreshToken = this.tokenService.generateRefreshToken(payload)

    await this.refreshTokenModel.create(
      newRefreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    )

    return {
      status_code: 200,
      success: true,
      message: 'Token refreshed successfully',
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken
      } as unknown as UserResponse
    }
  }

  async logoutService (
    refreshToken: string
  ): Promise<ResponseDto<UserResponse>> {
    const tokenRecord = await this.refreshTokenModel.findByTokenHash(
      refreshToken
    )

    if (!tokenRecord) {
      return {
        status_code: 400,
        success: false,
        message: 'Invalid or already revoked token'
      }
    }

    await this.refreshTokenModel.revokeToken(tokenRecord.id)

    return {
      status_code: 200,
      success: true,
      message: 'Logged out successfully'
    }
  }
}
