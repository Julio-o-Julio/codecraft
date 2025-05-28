import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateUserUseCase } from '../useCases/validateUserUseCase/validateUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string) {
    return await this.validateUserUseCase.execute({ phone, password });
  }
}
