"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    constructor(status_code, success, message, data, error) {
        this.status_code = status_code;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map