import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from './../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserViewModel } from './viewModels/userViewModel';
import { Public } from '../auth/decorators/isPublic';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create new User' })
  async createUser(@Body() body: CreateUserDto) {
    const { username, name, phone, password, confirmPassword } = body;

    const user = await this.createUserUseCase.execute({
      username,
      name,
      phone,
      password,
      confirmPassword,
    });

    return UserViewModel.toHttp(user);
  }
}
