import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessage } from './../data/ExceptionMessage';

export function IsValidCharactersCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsValidCharactersCustom',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Permite letras, números, underlines e pontos
          const regex = /^[a-zA-Z0-9._]+$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return ExceptionMessage.IsValidCharacters(args.property);
        },
      },
    });
  };
}
