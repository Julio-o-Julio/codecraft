import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../user/repositories/UserRepository';
import { compare } from 'bcrypt';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';

interface ValidateUserRequest {
  phone: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ phone, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByPhone(phone);

    if (!user) throw new AuthValuesIncorrectException();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new AuthValuesIncorrectException();

    return user;
  }
}
