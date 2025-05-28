import {
  length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessage } from './../data/ExceptionMessage';

export function LengthCustom(
  min: number,
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'LengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return length(value, min, max);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.Length(
            validationArguments.property,
            min,
            max,
          );
        },
      },
    });
  };
}
