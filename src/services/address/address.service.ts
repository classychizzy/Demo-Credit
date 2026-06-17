import { ResponseDto } from '../../Dto/response/response.dto'
import { CreateAddressRequestDTO } from '../../Dto/address/createAddress.request.dto'
import { AddressModel } from '../../models/address.model'
import { CreateAddressDTO } from '../../Dto/address/address.dto'

export class AddressService {
  async createAddress(
    userId: string,
    data: CreateAddressRequestDTO
  ): Promise<ResponseDto<CreateAddressDTO>> {
    const existing = await AddressModel.findByUserId(userId)

    if (existing) {
      return { status_code: 409, success: false, message: 'Address already exists for this user' }
    }

    const payload: CreateAddressDTO = {
      ...data,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const address = await AddressModel.create(payload)

    return { status_code: 201, success: true, message: 'Address created successfully', data: address }
  }

  async getMyAddress(userId: string): Promise<ResponseDto<CreateAddressDTO>> {
    const address = await AddressModel.findByUserId(userId)

    if (!address) {
      return { status_code: 404, success: false, message: 'Address not found' }
    }

    return { status_code: 200, success: true, message: 'Address retrieved successfully', data: address }
  }

  async updateAddress(
    userId: string,
    data: Partial<CreateAddressRequestDTO>
  ): Promise<ResponseDto<CreateAddressDTO>> {
    const existing = await AddressModel.findByUserId(userId)

    if (!existing) {
      return { status_code: 404, success: false, message: 'Address not found' }
    }

    const updated = await AddressModel.update((existing as any).id, data)

    return { status_code: 200, success: true, message: 'Address updated successfully', data: updated }
  }
}
