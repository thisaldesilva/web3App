import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsValidSignature } from '../validators/valid-signature.validator';

export function IsSignatureValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSignatureValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidSignature,
    });
  };
}
