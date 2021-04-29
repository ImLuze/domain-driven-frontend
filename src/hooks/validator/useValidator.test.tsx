import { renderHook } from '@testing-library/react-hooks';
import useValidator from './useValidator';

/**
 * This is a Unit Test for an Interaction layer hook.
 * It mocks our API and tests if our Interaction layer enforces the expected behavior.
 *
 * Note: Don't write Unit Tests like this. Don't test everything. Unit Tests serve as a way to
 * document code. You should only write a Unit Test for a piece of code if:
 * 1. The piece of logic has some behavior which should be documented or
 *    can't easily be infered from the code.
 * 2. To help with debugging a piece of code.
 *
 * (More on this: https://github.com/ImLuze/frontend-architecture-demo#testing)
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
