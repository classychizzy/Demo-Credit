import { ResponseDto } from '../../Dto/response/response.dto';
import { CreateAddressRequestDTO } from '../../Dto/address/createAddress.request.dto';
import { CreateAddressDTO } from '../../Dto/address/address.dto';
export declare class AddressService {
    createAddress(userId: string, data: CreateAddressRequestDTO): Promise<ResponseDto<CreateAddressDTO>>;
    getMyAddress(userId: string): Promise<ResponseDto<CreateAddressDTO>>;
    updateAddress(userId: string, data: Partial<CreateAddressRequestDTO>): Promise<ResponseDto<CreateAddressDTO>>;
}
//# sourceMappingURL=address.service.d.ts.map