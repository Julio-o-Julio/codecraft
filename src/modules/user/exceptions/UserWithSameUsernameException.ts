import { HttpStatus } from '@nestjs/common';
import { AppException } from './../../../exceptions/appExceptions';

export class UserWithSameUsernameException extends AppException {
  constructor() {
    super({
      message: 'Já existe uma conta com este username',
      status: HttpStatus.CONFLICT,
    });
  }
}
