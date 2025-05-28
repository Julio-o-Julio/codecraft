import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      username: 'usernameFake',
      name: 'Fake Name',
      phone: '5567970707070',
      password: 'Teste123',
      ...override,
    },
    id,
  );
};
