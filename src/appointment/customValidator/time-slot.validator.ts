import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTimeSlotConstraint implements ValidatorConstraintInterface {
  validate(timeSlot: string) {
    const timeSlotRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return timeSlotRegex.test(timeSlot);
  }

  defaultMessage() {
    return 'Time slot must be in the format "HH:MM AM/PM - HH:MM AM/PM"';
  }
}

export function IsTimeSlot(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeSlotConstraint,
    });
  };
}
