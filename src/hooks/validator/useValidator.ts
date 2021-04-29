import { ValidationResult } from './models/ValidationResult';
import { ValidationRule } from './models/ValidationRule';

/**
 * This hook is the decision making layer (Interaction layer).
 * This is reusable. It has no dependencies outside itself.
 * It can easily be replaced with a hook with a similar interface.
 * This hook decides which domain specific models and operations the application has access to.
 */

export type Validate<I> = (input: I) => ValidationResult;

const useValidator = <I>(rules: ValidationRule<I>[]): Validate<I> => {
  const validate: Validate<I> = (input) => {
    const errorMessages: string[] = [];

    rules.forEach((rule) => {
      if (!rule.rule(input)) {
        errorMessages.push(rule.errorMessage);
      }
    });

    return {
      isValid: errorMessages.length === 0,
      errorMessage: errorMessages[0],
      errorMessages,
    };
  };

  return validate;
};

export default useValidator;
