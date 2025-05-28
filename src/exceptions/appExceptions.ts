import { HttpException, HttpStatus } from '@nestjs/common';

function formatHttpStatus(status: HttpStatus): string {
  const raw = HttpStatus[status]; // exemplo: "BAD_REQUEST"
  return raw
    .toLowerCase() // "bad_request"
    .replace(/_/g, ' ') // "bad request"
    .replace(/\b\w/g, (c) => c.toUpperCase()); // "Bad Request"
}

interface AppExceptionPayload {
  message: string | string[];
  status: HttpStatus;
  fields?: {
    [key: string]: string;
  };
}

export class AppException extends HttpException {
  constructor({ message, status, fields }: AppExceptionPayload) {
    super(
      {
        message: Array.isArray(message) ? message : [message],
        error: formatHttpStatus(status),
        statusCode: status,
        fields,
      },
      status,
    );
  }
}
