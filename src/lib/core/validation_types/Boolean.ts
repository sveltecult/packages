import Decision from '$lib/core/concerns/Decisions.js';
import Base from './Base.js';
import type { FnWhen } from '$lib/types.js';

/**
 * Class: BooleanValidation
 *
 * The BooleanValidation class extends the Base class and provides boolean-specific validation rules.
 *
 * @extends Base
 */
export default class BooleanValidation extends Base {
	/**
	 * Constructor for the BooleanValidation class.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(message: string) {
		super('boolean', message);
	}

	/**
	 * Specifies that the attribute must be accepted (truthy value).
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be accepted".
	 * @returns Current instance of the BooleanValidation class for method chaining.
	 */
	accepted(message: string = 'The :attribute field must be accepted'): this {
		const rule = new Decision(message).setRule('accepted').setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute must be accepted (truthy value) based on a condition.
	 * @param fn - Function that returns a boolean determining whether validation is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be accepted".
	 * @returns Current instance of the BooleanValidation class for method chaining.
	 */
	acceptedWhen(fn: FnWhen, message: string = 'The :attribute field must be accepted'): this {
		const rule = new Decision(message).setRule('acceptedWhen').setFn(fn).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute must be declined (falsy value).
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be declined".
	 * @returns Current instance of the BooleanValidation class for method chaining.
	 */
	declined(message: string = 'The :attribute field must be declined'): this {
		const rule = new Decision(message).setRule('declined').setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute must be declined (falsy value) based on a condition.
	 * @param fn - Function that returns a boolean determining whether validation is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be declined".
	 * @returns Current instance of the BooleanValidation class for method chaining.
	 */
	declinedWhen(fn: FnWhen, message: string = 'The :attribute field must be declined'): this {
		const rule = new Decision(message).setRule('declinedWhen').setFn(fn).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}
}
