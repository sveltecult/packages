import type { Fn, FnWhen, InputTypes } from '$lib/types.js';
import Input from '$lib/core/concerns/Inputs.js';
import Types from '$lib/core/concerns/Types.js';

/**
 * Parent class for validation rules providing basic functionality and shared methods.
 * @param type - Type of input being validated.
 * @param message - Default error message for validation failure.
 */
export default class Base {
	/**
	 * Custom error message for validation failure.
	 * @protected
	 */
	protected message: string;

	/**
	 * The type of the field.
	 * @protected
	 */
	protected type: InputTypes;

	/**
	 * Determines whether the validation process should bail (stop) on the first encountered error.
	 * If set to true, the validation process will stop on the first encountered error.
	 * If set to false (default), the validation process will continue after encountering errors.
	 * @protected
	 */
	protected isBailable: boolean = false;

	/**
	 * Array to store validation function call stacks.
	 * @protected
	 */
	protected callstacks: Fn[] = [];

	/**
	 * Constructor for the Base class.
	 *
	 * @param {InputTypes} type - The type of the field.
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(type: InputTypes, message: string) {
		this.type = type;
		this.message = message;

		const rule = new Types(this.type, message);

		this.callstacks.push(rule.validate.bind(rule));
	}

	/**
	 * Specifies that the attribute is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is required".
	 * @returns Current instance of the Base class for method chaining.
	 */
	required(message: string = 'The :attribute field is required'): this {
		const rule = new Input(message).setRule('required').setType(this.type);

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute is required based on a condition.
	 * @param fn - Function that returns a boolean determining whether validation is required.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is required".
	 * @returns Current instance of the Base class for method chaining.
	 */
	requiredWhen(fn: FnWhen, message: string = 'The :attribute field is required'): this {
		const rule = new Input(message).setRule('requiredWhen').setFn(fn).setType(this.type);

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute is prohibited.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is prohibited".
	 * @returns Current instance of the Base class for method chaining.
	 */
	prohibited(message: string = 'The :attribute field is prohibited'): this {
		const rule = new Input(message).setRule('prohibited').setType(this.type);

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute is prohibited based on a condition.
	 * @param fn - Function that returns a boolean determining whether validation is prohibited.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field is prohibited".
	 * @returns Current instance of the Base class for method chaining.
	 */
	prohibitedWhen(fn: FnWhen, message: string = 'The :attribute field is prohibited'): this {
		const rule = new Input(message).setRule('prohibitedWhen').setFn(fn).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a custom validation function for the attribute.
	 * @param fn - Custom validation function to be executed.
	 * @returns Current instance of the Base class for method chaining.
	 */
	custom(fn: Fn): this {
		this.callstacks.push(fn);

		return this;
	}

	/**
	 * Specifies that validation should stop on the first validation failure encountered.
	 * @returns Current instance of the Base class for method chaining.
	 */
	bail(): this {
		this.isBailable = true;

		return this;
	}

	/**
	 * Prepares and returns an array of functions for validation.
	 * @returns Array of functions representing the validation rules.
	 */
	prepare(): Fn[] {
		return this.callstacks;
	}
}
