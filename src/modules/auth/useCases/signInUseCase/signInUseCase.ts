import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/entities/User';
import { UserPayload } from '../../models/UserPayload';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      phone: user.phone,
      updatedAt: user.updatedAt.toJSON(),
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
