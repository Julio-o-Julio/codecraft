import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './signInUseCase';
import { makeUser } from '../../../user/factories/userFactory';
import { UserPayload } from '../../models/UserPayload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign In', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Shold be able to create valid access_token', async () => {
    const user = makeUser({});

    const token = await signInUseCase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
