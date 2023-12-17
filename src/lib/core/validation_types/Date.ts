import Base from './Base.js';
import Dates from '$lib/core/concerns/Dates.js';

/**
 * Class: DateValidation
 *
 * The DateValidation class extends the Base class and provides date-specific validation rules.
 *
 * @extends Base
 */
export default class DateValidation extends Base {
	/**
	 * Constructor for the DateValidation class.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(message: string) {
		super('date', message);
	}

	/**
	 * Specifies that the attribute date must be equal to a specific date.
	 * @param date - Date to compare the attribute date with. Can be a Date object, a string date
	 *              or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be :$1".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	equal(date: Date | string, message: string = 'The :attribute field must be :$1'): this {
		const rule = new Dates(message).setRule('equal').setMin(date).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'equal' method.
	 */
	at = this.equal;

	/**
	 * Alias for the 'equal' method.
	 */
	same = this.equal;

	/**
	 * Alias for the 'equal' method.
	 */
	matches = this.equal;

	/**
	 * Specifies that the attribute date must come after a specific date.
	 * @param date - Date to compare the attribute date with. Can be a Date object, a string date
	 *              or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must come after :$1".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	after(date: Date | string, message: string = 'The :attribute field must come after :$1'): this {
		const rule = new Dates(message).setRule('gt').setMin(date).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute date must come on or after a specific date.
	 * @param date - Date to compare the attribute date with. Can be a Date object, a string date
	 *              or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must come on or after :$1".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	afterOrEqual(
		date: Date | string,
		message: string = 'The :attribute field must come on or after :$1'
	): this {
		const rule = new Dates(message).setRule('gte').setMin(date).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'afterOrEqual' method.
	 */
	onOrAfter = this.afterOrEqual;

	/**
	 * Specifies that the attribute date must come before a specific date.
	 * @param date - Date to compare the attribute date with. Can be a Date object, a string date
	 *              or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must come before :$1".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	before(date: Date | string, message: string = 'The :attribute field must come before :$1'): this {
		const rule = new Dates(message).setRule('lt').setMin(date).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute date must come on or before a specific date.
	 * @param date - Date to compare the attribute date with. Can be a Date object, a string date,
	 *              or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must come on or before :$1".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	beforeOrEqual(
		date: Date | string,
		message: string = 'The :attribute field must come on or before :$1'
	): this {
		const rule = new Dates(message).setRule('lte').setMin(date).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'beforeOrEqual' method.
	 */
	onOrBefore = this.beforeOrEqual;

	/**
	 * Specifies that the attribute date must come after a minimum date but not later than a maximum date.
	 * @param min - Minimum date for comparison. Can be a Date object, a string date, or another field's name.
	 * @param max - Maximum date for comparison. Can be a Date object, a string date, or another field's name.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must come after :$1 but not later than :$2".
	 * @returns Current instance of the DateValidation class for method chaining.
	 */
	between(
		min: Date | string,
		max: Date | string,
		message: string = 'The :attribute field must come after :$1 but not later than :$2'
	): this {
		const rule = new Dates(message).setRule('between').setMin(min).setMax(max).setType('date');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}
}
