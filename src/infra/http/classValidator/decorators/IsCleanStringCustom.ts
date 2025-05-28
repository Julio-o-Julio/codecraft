import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessage } from './../data/ExceptionMessage';

export function IsCleanStringCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsCleanStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Permite apenas letras (maiúsculas ou minúsculas) e caracteres. Sem espaços, números ou acentos
          const regex = /^[a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsCleanString(validationArguments.property);
        },
      },
    });
  };
}
