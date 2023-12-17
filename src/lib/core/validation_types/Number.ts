import Count from '$lib/core/concerns/Count.js';
import Pattern from '$lib/core/concerns/Patterns.js';
import Base from './Base.js';

/**
 * Class: NumberValidation
 *
 * The NumberValidation class extends the Base class and provides number-specific validation rules.
 *
 * @extends Base
 */
export default class NumberValidation extends Base {
	/**
	 * Constructor for the NumberValidation class.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(message: string) {
		super('number', message);
	}

	/**
	 * Specifies the minimum value required for the attribute number.
	 * @param number - Minimum value required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be greater than :$1".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	min(number: number, message: string = 'The :attribute field must be greater than :$1'): this {
		const rule = new Count(message).setRule('gt').setMin(number).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'min' method.
	 */
	gt = this.min;

	/**
	 * Specifies that the attribute number must be less than or equal to a maximum value.
	 * @param number - Maximum value allowed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be less than or equal :$1".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	lte(
		number: number,
		message: string = 'The :attribute field must be less than or equal :$1'
	): this {
		const rule = new Count(message).setRule('lte').setMin(number).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies the maximum value allowed for the attribute number.
	 * @param number - Maximum value allowed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be less than :$1".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	max(number: number, message: string = 'The :attribute field must be less than :$1'): this {
		const rule = new Count(message).setRule('lt').setMin(number).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'max' method.
	 */
	lt = this.max;

	/**
	 * Specifies that the attribute number must be greater than or equal to a minimum value.
	 * @param number - Minimum value required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be greater than or equal :$1".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	gte(
		number: number,
		message: string = 'The :attribute field must be greater than or equal :$1'
	): this {
		const rule = new Count(message).setRule('gte').setMin(number).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute number must be between two specified values.
	 * @param min - Minimum value allowed.
	 * @param max - Maximum value allowed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be between :$1 and :$2".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	between(
		min: number,
		max: number,
		message: string = 'The :attribute field must be between :$1 and :$2'
	): this {
		const rule = new Count(message).setRule('between').setMin(min).setMax(max).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a regular expression pattern for validating the attribute number.
	 * @param pattern - Regular expression pattern to match against the attribute number.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	regex(pattern: RegExp, message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message).setRule('regex').setPattern(pattern).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a regular expression pattern that the attribute number should not match.
	 * @param pattern - Regular expression pattern to avoid matching against the attribute number.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the NumberValidation class for method chaining.
	 */
	notRegex(pattern: RegExp, message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message).setRule('notRegex').setPattern(pattern).setType('number');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}
}
