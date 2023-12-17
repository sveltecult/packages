import ArrayValidation from './validation_types/Array.js';
import BooleanValidation from './validation_types/Boolean.js';
import DateValidation from './validation_types/Date.js';
import FileValidation from './validation_types/File.js';
import NumberValidation from './validation_types/Number.js';
import StringValidation from './validation_types/String.js';

/**
 * Class: Rule
 *
 * The Rule class helps in declaring the correct type of the field for mapping validation classes.
 */
export default class Rule {
	/**
	 * Creates an Array instance for an array type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {ArrayValidation} - An ArrayValidation instance.
	 */
	static array(
		message: string = 'The :attribute field has an invalid :type value'
	): ArrayValidation {
		return new ArrayValidation(message);
	}

	/**
	 * Creates a Boolean instance for a boolean type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {StringValidation} - A BooleanValidation instance.
	 */
	static boolean(
		message: string = 'The :attribute field has an invalid :type value'
	): BooleanValidation {
		return new BooleanValidation(message);
	}

	/**
	 * Creates a Rule instance for a date type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {DateValidation} - A DateValidation instance.
	 */
	static date(message: string = 'The :attribute field has an invalid :type value'): DateValidation {
		return new DateValidation(message);
	}

	/**
	 * Creates a Rule instance for a file type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {FileValidation} - A FileValidation instance.
	 */
	static file(message: string = 'The :attribute field has an invalid :type'): FileValidation {
		return new FileValidation(message);
	}

	/**
	 * Creates a Rule instance for a number type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {NumberValidation} - A NumberValidation instance.
	 */
	static number(
		message: string = 'The :attribute field has an invalid numerical value'
	): NumberValidation {
		return new NumberValidation(message);
	}

	/**
	 * Creates a Rule instance for a string type field.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 * @returns {StringValidation} - A StringValidation instance.
	 */
	static string(
		message: string = 'The :attribute field has an invalid :type value'
	): StringValidation {
		return new StringValidation(message);
	}
}
