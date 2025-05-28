import {
  isLowercase,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessage } from './../data/ExceptionMessage';

export function IsLowercaseCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsLowercaseCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isLowercase(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsLowercase(validationArguments.property);
        },
      },
    });
  };
}
