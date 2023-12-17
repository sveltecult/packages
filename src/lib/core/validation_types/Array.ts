import Base from './Base.js';
import Input from '$lib/core/concerns/Inputs.js';
import Count from '$lib/core/concerns/Count.js';
import type { FnWhen } from '$lib/types.js';

/**
 * Class: ArrayValidation
 *
 * The ArrayValidation class extends the Base class and provides array-specific validation rules.
 *
 * @extends Base
 */
export default class ArrayValidation extends Base {
	/**
	 * Constructor for the ArrayValidation class.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(message: string) {
		super('array', message);
	}

	/**
	 * Specifies that at least one element in the attribute array is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is required".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	requiredSome(message: string = 'The :attribute field is required'): this {
		const rule = new Input(message).setRule('requiredSome').setType(this.type);

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that at least one element in the attribute array is required based on a condition.
	 * @param fn - Function that returns a boolean determining whether validation is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is required".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	requiredSomeWhen(fn: FnWhen, message: string = 'The :attribute field is required'): this {
		const rule = new Input(message).setRule('requiredSomeWhen').setFn(fn).setType(this.type);

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies the minimum number of elements required in the attribute array.
	 * @param number - Minimum number of elements required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be greater than :$1".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	min(number: number, message: string = 'The :attribute field must be greater than :$1'): this {
		const rule = new Count(message).setRule('gt').setMin(number).setType('array');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'min' method.
	 */
	gt = this.min;

	/**
	 * Specifies the maximum number of elements allowed in the attribute array.
	 * @param number - Maximum number of elements allowed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be less than :$1".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	max(number: number, message: string = 'The :attribute field must be less than :$1'): this {
		const rule = new Count(message).setRule('lt').setMin(number).setType('array');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'max' method.
	 */
	lt = this.max;

	/**
	 * Specifies that the attribute array length must be greater than or equal to a minimum number.
	 * @param number - Minimum length required for the attribute array.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be greater than or equal :$1".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	gte(
		number: number,
		message: string = 'The :attribute field must be greater than or equal :$1'
	): this {
		const rule = new Count(message).setRule('gte').setMin(number).setType('array');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute array length must be less than or equal to a maximum number.
	 * @param number - Maximum length allowed for the attribute array.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be less than or equal :min".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	lte(
		number: number,
		message: string = 'The :attribute field must be less than or equal :$1'
	): this {
		const rule = new Count(message).setRule('lte').setMin(number).setType('array');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute array length must be equal to a specific number.
	 * @param number - Exact length required for the attribute array.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be equal to :min".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	length(number: number, message: string = 'The :attribute field must be equal to :$1'): this {
		const rule = new Count(message).setRule('equal').setMin(number).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'length' method.
	 */
	equal = this.length;

	/**
	 * Specifies that the attribute array must be between two specified values.
	 * @param min - Minimum value allowed.
	 * @param max - Maximum value allowed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be between :$1 and :$2".
	 * @returns Current instance of the ArrayValidation class for method chaining.
	 */
	between(
		min: number,
		max: number,
		message: string = 'The :attribute field must be between :$1 and :$2'
	): this {
		const rule = new Count(message).setRule('between').setMin(min).setMax(max).setType('array');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}
}
