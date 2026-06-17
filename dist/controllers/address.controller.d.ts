import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express/authRequest';
export declare class AddressController {
    private addressService;
    constructor();
    createAddressController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getMyAddressController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAddressController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=address.controller.d.ts.map