import ValidationFailed from './core/ValidationFailed.js';

/**
 * Type definition for a Placeholder object containing key-value pairs of placeholders and their corresponding values.
 */
export type Placeholder = {
	[key: string]: string;
};

/**
 * Type definition for the function used as a callback.
 */
export type Fn = (
	attribute: string,
	value: any,
	formData?: FormData
) => Promise<string | undefined>;

/**
 * Type definition for the function used as a condition.
 */
export type FnWhen = (attribute: string, value: any, formData?: FormData) => Promise<boolean>;

/**
 * Type definition for input types.
 */
export type InputTypes = 'array' | 'boolean' | 'date' | 'file' | 'number' | 'string';

/**
 * Interface: ValidationRule
 *
 * The ValidationRule interface defines the contract for implementing validation rules
 * that can be used in a validation process.
 */
export interface ValidationRules {
	/**
	 * Validates the given attribute value based on the specific validation rule implementation.
	 *
	 * @param {string} attribute - The name of the attribute being validated.
	 * @param {any} value - The value of the attribute being validated.
	 * @param {FormData} [formData] - The form data containing the values of all fields (optional).
	 * @returns {Promise<string | undefined | ValidationFailed>} - A promise that resolves to:
	 *    - A string error message if validation fails due to invalid user input.
	 *    - An instance of ValidationFailed if the validation fails on type checking.
	 *    - Undefined if the input passes the validation.
	 */
	validate(
		attribute: string,
		value: any,
		formData?: FormData
	): Promise<string | undefined | ValidationFailed>;

	setType(type: InputTypes): this;
}
