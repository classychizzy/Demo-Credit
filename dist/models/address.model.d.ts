import { CreateAddressDTO } from "../Dto/address/address.dto";
export declare const AddressModel: {
    create(data: CreateAddressDTO): Promise<CreateAddressDTO>;
    findById(id: string): Promise<CreateAddressDTO | undefined>;
    findByUserId(user_id: string): Promise<CreateAddressDTO | undefined>;
    update(id: string, data: Partial<CreateAddressDTO>): Promise<CreateAddressDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=address.model.d.ts.map