import type { ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule = 'in' | 'notIn';

export default class Lists extends Base implements ValidationRules {
	protected rule: Rule;

	protected array: string[] = [];

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData?: FormData): Promise<string | undefined> {
		if (value === null || value === '') {
			return undefined;
		}

		this.onFailure = new ValidationFailed({
			':attribute': attribute,
			':array': this.array.join(', ')
		});
		this.attribute = attribute;
		this.value = value;
		this.formData = formData;

		switch (this.rule) {
			case 'in':
				return this.in();

			case 'notIn':
				return this.notIn();
		}
	}

	private in(): string | undefined {
		if (this.array.includes(this.value)) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private notIn() {
		if (!this.array.includes(this.value)) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}

	setArray(array: any[]): this {
		this.array = Array.isArray(array) ? array : [array];

		return this;
	}
}
