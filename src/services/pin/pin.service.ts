import bcrypt from 'bcrypt'
import { ResponseDto } from '../../Dto/response/response.dto'
import { SetPinDTO, ChangePinDTO, VerifyPinDTO, ResetPinDTO } from '../../Dto/usersPin/usersPin.dto'
import { UsersPinModel } from '../../models/usersPin.model'
import { UserModel } from '../../models/user.model'

export class PinService {
  async setPin(userId: string, data: SetPinDTO): Promise<ResponseDto> {
    const existing = await UsersPinModel.findByUserId(userId)

    if (existing) {
      return { status_code: 409, success: false, message: 'PIN already set. Use change PIN to update it' }
    }

    const hashedPin = await bcrypt.hash(data.pin, 10)

    await UsersPinModel.create({ user_id: userId, pin: hashedPin })

    return { status_code: 201, success: true, message: 'PIN set successfully' }
  }

  async changePin(userId: string, data: ChangePinDTO): Promise<ResponseDto> {
    const record = await UsersPinModel.findByUserId(userId)

    if (!record) {
      return { status_code: 404, success: false, message: 'No PIN found. Set a PIN first' }
    }

    const isMatch = await bcrypt.compare(data.old_pin, record.pin)

    if (!isMatch) {
      return { status_code: 401, success: false, message: 'Incorrect current PIN' }
    }

    if (data.old_pin === data.new_pin) {
      return { status_code: 400, success: false, message: 'New PIN must differ from current PIN' }
    }

    const hashedPin = await bcrypt.hash(data.new_pin, 10)

    await UsersPinModel.update(record.id!, { pin: hashedPin })

    return { status_code: 200, success: true, message: 'PIN changed successfully' }
  }

  async verifyPin(userId: string, data: VerifyPinDTO): Promise<ResponseDto> {
    const record = await UsersPinModel.findByUserId(userId)

    if (!record) {
      return { status_code: 404, success: false, message: 'No PIN found. Set a PIN first' }
    }

    const isMatch = await bcrypt.compare(data.pin, record.pin)

    if (!isMatch) {
      return { status_code: 401, success: false, message: 'Incorrect PIN' }
    }

    return { status_code: 200, success: true, message: 'PIN verified' }
  }

  async resetPin(userId: string, data: ResetPinDTO): Promise<ResponseDto> {
    const userBase = await UserModel.findById(userId)

    if (!userBase) {
      return { status_code: 404, success: false, message: 'User not found' }
    }

    // findByEmail is the only model method that returns the hashed password
    const userWithPassword = await UserModel.findByEmail(userBase.email)

    const passwordMatch = await bcrypt.compare(data.password, userWithPassword!.password as string)

    if (!passwordMatch) {
      return { status_code: 401, success: false, message: 'Incorrect password' }
    }

    const record = await UsersPinModel.findByUserId(userId)
    const hashedPin = await bcrypt.hash(data.new_pin, 10)

    if (record) {
      await UsersPinModel.update(record.id!, { pin: hashedPin })
    } else {
      await UsersPinModel.create({ user_id: userId, pin: hashedPin })
    }

    return { status_code: 200, success: true, message: 'PIN reset successfully' }
  }
}
