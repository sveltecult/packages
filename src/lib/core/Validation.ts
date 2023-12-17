import Errors from './Errors.js';
import ValidationFailed from './ValidationFailed.js';

/**
 * Class: Validation
 *
 * The Validation class orchestrates the validation process based on specified rules for each attribute.
 */
export default class Validation {
	/**
	 * The form data containing the values of all fields to be validated.
	 * @protected
	 */
	protected formData: FormData;

	/**
	 * The validation rules for each attribute.
	 * @protected
	 */
	protected rules: object;

	/**
	 * The validation errors, if any, encountered during the validation process.
	 * @protected
	 */
	protected messages = {};

	/**
	 * Constructor for the Validation class.
	 *
	 * @param {FormData} formData - The form data containing the values of all fields to be validated.
	 * @param {object} rules - The validation rules for each attribute.
	 */
	constructor(formData: FormData, rules: object) {
		this.formData = formData;
		this.rules = rules;
	}

	/**
	 * Asynchronously performs the validation based on the specified rules and form data.
	 *
	 * @returns {Promise<Errors>} - A promise that resolves to the validation errors encountered during the process.
	 */
	async errors(): Promise<Errors> {
		const e = new Errors(this.messages);

		for (let field in this.rules) {
			let rules = this.rules[field].prepare();

			const isBailable = this.rules[field].isBailable;

			for (let fn of rules) {
				if (!field.endsWith('.*')) {
					const value = field.endsWith('[]')
						? this.formData.getAll(field)
						: this.formData.get(field);

					let result = await fn(field, value, this.formData);

					if (result instanceof ValidationFailed) {
						e.add(
							field,
							result
								.addPlaceholder(':type', this.rules[field].type)
								.message(this.rules[field].message)
						);
						break;
					}

					if (result !== undefined) {
						e.add(field, result);

						if (isBailable === true) {
							break;
						}
					}
				} else {
					const alias = field.replace('.*', '');

					for (const [a, value] of this.formData.getAll(`${alias}[]`).entries()) {
						const attribute = `${alias}[${a}]`;

						let result = await fn(attribute, value, this.formData);

						if (result !== undefined) {
							e.add(`${alias}[]`, result);
						}
					}
				}
			}
		}

		return e;
	}
}
