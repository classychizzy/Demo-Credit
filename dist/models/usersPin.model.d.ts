import { CreateUsersPinDTO } from "../Dto/usersPin/usersPin.dto";
export declare const UsersPinModel: {
    create(data: CreateUsersPinDTO): Promise<CreateUsersPinDTO>;
    findById(id: string): Promise<CreateUsersPinDTO | undefined>;
    findByUserId(user_id: string): Promise<CreateUsersPinDTO | undefined>;
    update(id: string, data: Partial<CreateUsersPinDTO>): Promise<CreateUsersPinDTO>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=usersPin.model.d.ts.map