import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsCleanStringCustom } from 'src/infra/http/classValidator/decorators/IsCleanStringCustom';
import { IsLowercaseCustom } from 'src/infra/http/classValidator/decorators/IsLowercaseCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsPhoneCustom } from 'src/infra/http/classValidator/decorators/IsPhoneCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { IsValidCharactersCustom } from 'src/infra/http/classValidator/decorators/IsValidCharactersCustom';
import { LengthCustom } from 'src/infra/http/classValidator/decorators/LengthCustom';

export class CreateUserDto {
  @ApiProperty({ example: 'teste_teste.' })
  @IsValidCharactersCustom()
  @IsCleanStringCustom()
  @IsLowercaseCustom()
  @LengthCustom(4, 32)
  @IsStringCustom()
  @IsNotEmptyCustom()
  username: string;

  @ApiProperty({ example: '5567912345678' })
  @IsPhoneCustom()
  @LengthCustom(13, 13)
  @IsStringCustom()
  @IsNotEmptyCustom()
  phone: string;

  @ApiProperty({ required: false, example: 'Teste Testando' })
  @IsStringCustom()
  @LengthCustom(2, 128)
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Teste123' })
  @LengthCustom(6, 128)
  @IsStringCustom()
  @IsNotEmptyCustom()
  password: string;

  @ApiProperty({ example: 'Teste123' })
  @LengthCustom(6, 128)
  @IsStringCustom()
  @IsNotEmptyCustom()
  confirmPassword: string;
}
