import type { InputTypes, ValidationRules } from '$lib/types.js';
import Base from './Base.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';

export default class Types extends Base implements ValidationRules {
	constructor(type: InputTypes, message: string) {
		super();

		this.type = type;
		this.message = message;
	}

	async validate(attribute: string, value: any): Promise<string | undefined | ValidationFailed> {
		if (value === null || value === '') {
			return;
		}

		this.onFailure = new ValidationFailed({
			':attribute': attribute
		});

		switch (this.type) {
			case 'array':
				return this.isArray(value);

			case 'boolean':
				return this.isBoolean(value);

			case 'date':
				return this.isDate(value);

			case 'file':
				return this.isFile(value);

			case 'number':
				return this.isNumber(value);

			case 'string':
				return this.isString(value);

			default:
				return this.onFailure;
		}
	}

	private isArray(value: any): undefined | ValidationFailed {
		if (!Array.isArray(value)) {
			return this.onFailure;
		}
	}

	private isBoolean(value: any): undefined | ValidationFailed {
		if (!['yes', 'on', '1', 1, true, 'true', 'no', 'off', '0', 0, false, 'false'].includes(value)) {
			return this.onFailure;
		}
	}

	private isDate(value: any): undefined | ValidationFailed {
		if (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) {
			let date = new Date(value);

			if (isNaN(date.getTime())) {
				return this.onFailure;
			}

			return undefined;
		}

		return this.onFailure;
	}

	private isFile(value: any): undefined | ValidationFailed {
		if (!(value instanceof Blob)) {
			return this.onFailure;
		}
	}

	private isNumber(value: any): undefined | ValidationFailed {
		if (isNaN(value) || Array.isArray(value)) {
			return this.onFailure;
		}
	}

	private isString(value: any): undefined | ValidationFailed {
		if (typeof value !== 'string') {
			return this.onFailure;
		}
	}
}
