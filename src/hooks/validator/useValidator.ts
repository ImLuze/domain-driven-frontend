import { ValidationResult } from './models/ValidationResult';
import { ValidationRule } from './models/ValidationRule';

/**
 * As indicated by the return type, this hook is not really an Interaction layer hook, it's merely a
 * utility to help us achieve something. Wether it should be placed in a separate directory is up
 * for debate.
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
