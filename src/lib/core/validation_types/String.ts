import Count from '$lib/core/concerns/Count.js';
import List from '$lib/core/concerns/Lists.js';
import Pattern from '$lib/core/concerns/Patterns.js';
import Input from '$lib/core/concerns/Inputs.js';
import Base from './Base.js';
import BooleanValidation from './Boolean.js';

/**
 * Class: StringValidation
 *
 * The StringValidation class extends the Base class and provides string-specific validation rules.
 *
 * @extends Base
 */
export default class StringValidation extends Base {
	/**
	 * Constructor for StringValidation class.
	 * @param message - Error message to be displayed on validation failure.
	 */
	constructor(message: string) {
		super('string', message);
	}

	/**
	 * Alias for accepted method.
	 */
	accepted = BooleanValidation.prototype.accepted;

	/**
	 * Alias for acceptedWhen method.
	 */
	acceptedWhen = BooleanValidation.prototype.acceptedWhen;

	/**
	 * Alias for declined method.
	 */
	declined = BooleanValidation.prototype.declined;

	/**
	 * Alias for declinedWhen method.
	 */
	declinedWhen = BooleanValidation.prototype.declinedWhen;

	/**
	 * Specifies the minimum length for a string attribute.
	 * @param number - The minimum length required.
	 * @param message - Custom error message for validation failure.
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	minLength(
		number: number,
		message: string = 'The :attribute field must be longer than :$1 characters'
	): this {
		const rule = new Count(message).setRule('gt').setMin(number).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies the maximum length for a string attribute.
	 * @param number - The maximum length allowed.
	 * @param message - Custom error message for validation failure.
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	maxLength(
		number: number,
		message: string = 'The :attribute field must be shorter than :$1 characters'
	): this {
		const rule = new Count(message).setRule('lt').setMin(number).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies the exact length for a string attribute.
	 * @param number - The exact length required.
	 * @param message - Custom error message for validation failure.
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	length(
		number: number,
		message: string = 'The :attribute field must be equal to :$1 characters'
	): this {
		const rule = new Count(message).setRule('equal').setMin(number).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a range of lengths for a string attribute.
	 * @param min - The minimum length allowed.
	 * @param max - The maximum length allowed.
	 * @param message - Custom error message for validation failure.
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	lengthBetween(
		min: number,
		max: number,
		message: string = 'The :attribute field must be between :$1 to :$2 characters'
	): this {
		const rule = new Count(message).setRule('between').setMin(min).setMax(max).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must be confirmed.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be confirmed".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	confirmed(message: string = 'The :attribute field must be confirmed'): this {
		const rule = new Input(message).setRule('confirmed').setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must be present in the specified array.
	 * @param array - Array of string values the attribute value should be a part of.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be in :array".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	in(array: string[], message: string = 'The :attribute field must be in :array'): this {
		const rule = new List(message).setRule('in').setArray(array).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must not be present in the specified array.
	 * @param array - Array of string values the attribute value should not be a part of.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must not be in :array".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	notIn(array: string[], message: string = 'The :attribute field must not be in :array'): this {
		const rule = new List(message).setRule('notIn').setArray(array).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must have a valid email format.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	email(message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must represent a valid username format.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	username(message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must only contain alpha characters.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must only contain alpha characters".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	alpha(message: string = 'The :attribute field must only contain alpha characters'): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(/^[\p{L}\p{M}]+$/u)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must only contain alpha-numeric characters, dashes, or underscores.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must only contain alpha-numeric characters, dashes or underscores".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	alphaDash(
		message: string = 'The :attribute field must only contain alpha-numeric characters, dashes or underscores'
	): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(/^[\p{L}\p{M}\p{N}\-_]+$/u)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must only contain alpha-numeric characters.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must only contain alpha-numeric characters".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	alphaNumeric(
		message: string = 'The :attribute field must only contain alpha-numeric characters'
	): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(/^[\p{L}\p{M}\p{N}]+$/u)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for alphaNumeric method.
	 */
	alphaNum = this.alphaNumeric;

	/**
	 * Specifies that the attribute value must only contain ASCII characters.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must only contain ASCII characters".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	ascii(message: string = 'The :attribute field must only contain ASCII characters'): this {
		const rule = new Pattern(message)
			.setRule('regex')
			.setPattern(/^[\x00-\x7F]+$/)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a regular expression pattern for validating the attribute value.
	 * @param pattern - Regular expression pattern to match against the attribute value.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	regex(pattern: RegExp, message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message).setRule('regex').setPattern(pattern).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies a regular expression pattern that the attribute value should not match.
	 * @param pattern - Regular expression pattern to avoid matching against the attribute value.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid format".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	notRegex(pattern: RegExp, message: string = 'The :attribute field has an invalid format'): this {
		const rule = new Pattern(message).setRule('notRegex').setPattern(pattern).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must match the value of another field.
	 * @param field - Name of the other field to match against.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must match with the :$1 field".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	matches(
		field: string,
		message: string = 'The :attribute field must match with the :$1 field'
	): this {
		const rule = new Input(message)
			.setRule('matches')
			.setMatchingFieldOrText(field)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must not match the value of another field.
	 * @param field - Name of the other field to avoid matching against.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must not match with the :$1 field".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	mismatches(
		field: string,
		message: string = 'The :attribute field must not match with the :$1 field'
	): this {
		const rule = new Input(message)
			.setRule('mismatches')
			.setMatchingFieldOrText(field)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Specifies that the attribute value must be equal to a specific text.
	 * @param text - Text to compare the attribute value with.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be equal to :$1".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	same(text: string, message: string = 'The :attribute field must be equal to :$1'): this {
		const rule = new Input(message).setRule('same').setMatchingFieldOrText(text).setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'same' method.
	 */
	equal = this.same;

	/**
	 * Specifies that the attribute value must be different from a specific text.
	 * @param text - Text to compare the attribute value with.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field must be different from :$1".
	 * @returns Current instance of the StringValidation class for method chaining.
	 */
	different(
		text: string,
		message: string = 'The :attribute field must be different from :$1'
	): this {
		const rule = new Input(message)
			.setRule('different')
			.setMatchingFieldOrText(text)
			.setType('string');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'different' method.
	 */
	notEqual = this.different;
}
