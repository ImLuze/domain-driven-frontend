export interface ValidationRule<I> {
  rule: (input: I) => boolean;
  errorMessage: string;
}
