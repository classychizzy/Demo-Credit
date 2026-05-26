import { CreateAddressDTO, AddressResponseDTO } from "../Dto/address_dto";
export declare const AddressModel: {
    create(data: CreateAddressDTO): Promise<AddressResponseDTO>;
    findById(id: string): Promise<AddressResponseDTO | undefined>;
    findByUserId(user_id: string): Promise<AddressResponseDTO | undefined>;
    update(id: string, data: Partial<AddressResponseDTO>): Promise<AddressResponseDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=address_model.d.ts.map