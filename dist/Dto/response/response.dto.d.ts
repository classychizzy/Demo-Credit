export declare class ResponseDto<T = unknown> {
    status_code: number;
    success: boolean;
    message: string;
    data?: T | undefined;
    error?: unknown | undefined;
    constructor(status_code: number, success: boolean, message: string, data?: T | undefined, error?: unknown | undefined);
}
//# sourceMappingURL=response.dto.d.ts.map