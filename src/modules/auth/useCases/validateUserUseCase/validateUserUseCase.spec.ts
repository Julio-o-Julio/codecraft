import { genSalt, hash } from 'bcrypt';
import { makeUser } from '../../../user/factories/userFactory';
import { UserRepositoryInMemory } from '../../../user/repositories/UserRepositoryInMemory';
import { ValidateUserUseCase } from './validateUserUseCase';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const salt = await genSalt(10);

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, salt),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      phone: user.phone,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const salt = await genSalt(10);

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, salt),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        phone: 'incorrectPhone',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(AuthValuesIncorrectException);

    expect(async () => {
      await validateUserUseCase.execute({
        phone: user.phone,
        password: 'incorrectPassword',
      });
    }).rejects.toThrow(AuthValuesIncorrectException);
  });
});
