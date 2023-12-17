import type { ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule = 'equal' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';

export default class Decision extends Base implements ValidationRules {
	protected rule: Rule;

	protected min: number;

	protected max: number;

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData: FormData): Promise<string | undefined> {
		if (value === null || value === '') {
			return undefined;
		}

		this.onFailure = new ValidationFailed({
			':attribute': attribute,
			':$1': this.min.toString(),
			':$2': this.max?.toString()
		});
		this.attribute = attribute;
		this.value = Number(value);
		this.formData = formData;

		switch (this.type) {
			case 'array':
				this.value = value.length;
				break;

			case 'number':
				this.value = Number(value);
				break;

			case 'string':
				this.value = value.length;
				break;
		}

		switch (this.rule) {
			case 'equal':
				return this.equal();

			case 'gt':
				return this.gt();

			case 'gte':
				return this.gte();

			case 'lt':
				return this.lt();

			case 'lte':
				return this.lte();

			case 'between':
				return this.between();
		}
	}

	private equal(): string | undefined {
		if (this.value === this.min) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private gt(): string | undefined {
		if (this.value > this.min) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private gte(): string | undefined {
		if (this.value >= this.min) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private lt(): string | undefined {
		if (this.value < this.min) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private lte(): string | undefined {
		if (this.value <= this.min) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private between(): string | undefined {
		if (this.min > this.max) {
			return 'The :attribute field or the comparison number or field is not valid.';
		}

		if (this.value >= this.min && this.value <= this.max) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	setMin(number: number): this {
		this.min = Number(number);

		return this;
	}

	setMax(number: number): this {
		this.max = Number(number);

		return this;
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}
}
