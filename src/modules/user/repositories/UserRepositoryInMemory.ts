import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);

    return await Promise.resolve();
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);

    return await Promise.resolve(user ?? null);
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.users.find((user) => user.phone === phone);

    return await Promise.resolve(user ?? null);
  }
}
