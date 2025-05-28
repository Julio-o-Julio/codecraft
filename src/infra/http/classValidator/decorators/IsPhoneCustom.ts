import {
  isPhoneNumber,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessage } from './../data/ExceptionMessage';

export function IsPhoneCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsPhoneCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isPhoneNumber(value, 'BR');
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsPhone(validationArguments.property);
        },
      },
    });
  };
}
