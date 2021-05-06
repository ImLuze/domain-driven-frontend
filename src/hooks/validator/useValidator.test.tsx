import { renderHook } from '@testing-library/react-hooks';
import useValidator from './useValidator';

/**
 * This is a Unit Test for our utility hook.
 * It tests if our utility hook works as expected.
 *
 * Note: The unit tests here are very excessive. Don't unit test everything. Unit Tests serve as
 * a way to document code. You should only write a Unit Test for a piece of code if:
 * 1. Your hook solves a complex issue that needs to be documented or you notice from PR reviews
 *    that someone doesn't understand what you are trying to do.
 * 2. The issue you are solving is not being covered by an integration test.
 * 3. You need help debugging something that is cumbersome to test in a real life situation.
 */

const RULES = [
	{ rule: (input: string) => input !== 'invalid', errorMessage: 'input is invalid' },
	{ rule: (input: string) => input !== 'also invalid', errorMessage: 'input is also invalid' },
	{ rule: (input: string) => input !== 'double errors', errorMessage: 'error message 1' },
	{ rule: (input: string) => input !== 'double errors', errorMessage: 'error message 2' },
];

describe('useValidator', () => {
	describe('returns a method', () => {
		describe('validate', () => {
			it('validates an input based on a set of rules', () => {
				const { result: { current: validate } } = renderHook(() => useValidator(RULES));

				expect(validate('invalid')).toStrictEqual(expect.objectContaining({ isValid: false }));
				expect(validate('also invalid')).toStrictEqual(expect.objectContaining({ isValid: false }));
				expect(validate('valid')).toStrictEqual(expect.objectContaining({ isValid: true }));
			});

			describe('returns a set of models', () => {
				it('returns isValid', () => {
					const { result: { current: validate } } = renderHook(() => useValidator(RULES));

					expect(validate('invalid')).toStrictEqual(expect.objectContaining({ isValid: false }));
					expect(validate('also invalid')).toStrictEqual(expect.objectContaining({ isValid: false }));
					expect(validate('valid')).toStrictEqual(expect.objectContaining({ isValid: true }));
				});

				it('returns all errorMessages as an array', () => {
					const { result: { current: validate } } = renderHook(() => useValidator(RULES));

					expect(validate('invalid')).toStrictEqual(expect.objectContaining({ errorMessages: ['input is invalid'] }));
					expect(validate('also invalid')).toStrictEqual(expect.objectContaining({ errorMessages: ['input is also invalid'] }));
					expect(validate('double errors')).toStrictEqual(expect.objectContaining({ errorMessages: ['error message 1', 'error message 2'] }));
					expect(validate('valid')).toStrictEqual(expect.objectContaining({ errorMessages: [] }));
				});

				it('returns the first errorMessage as a string', () => {
					const { result: { current: validate } } = renderHook(() => useValidator(RULES));

					expect(validate('invalid')).toStrictEqual(expect.objectContaining({ errorMessage: 'input is invalid' }));
					expect(validate('also invalid')).toStrictEqual(expect.objectContaining({ errorMessage: 'input is also invalid' }));
					expect(validate('double errors')).toStrictEqual(expect.objectContaining({ errorMessage: 'error message 1' }));
					expect(validate('valid')).toStrictEqual(expect.objectContaining({ errorMessage: undefined }));
				});
			});
		});
	});
});
