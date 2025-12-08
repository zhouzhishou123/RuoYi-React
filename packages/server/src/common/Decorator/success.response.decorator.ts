import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function SuccessResponse(description?: string, type?: any, status?: HttpStatus) {
  return ApiResponse({
    status: status || HttpStatus.OK,
    description: description || '响应成功',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: type || String,
  });
}
