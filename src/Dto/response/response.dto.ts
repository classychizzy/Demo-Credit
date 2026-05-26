export class ResponseDto<T = unknown> {
  constructor(
    public status_code: number,
    public success: boolean,
    public message: string,
    public data?: T,
    public error?: unknown,
  ) {}
}