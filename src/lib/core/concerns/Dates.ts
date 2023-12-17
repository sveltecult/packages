import type { ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule = 'equal' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';

export default class Dates extends Base implements ValidationRules {
	protected rule: Rule;

	protected $1: Date | string;

	protected $2: Date | string;

	protected min: Date | undefined | null;

	protected max: Date | undefined | null;

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData: FormData): Promise<string | undefined> {
		if (value === null || value === '') {
			return undefined;
		}

		this.onFailure = new ValidationFailed({
			':attribute': attribute
		});
		this.attribute = attribute;
		this.value = new Date(value);
		this.formData = formData;

		this.value = this.normalize(value);
		this.min = this.normalize(this.$1);
		this.max = this.normalize(this.$2);

		if (this.min === null) {
			return undefined;
		}

		if (value === undefined || this.min === undefined) {
			return this.onFailure.message(
				'The :attribute field or the comparison date or field is not a valid date.'
			);
		}

		this.onFailure.addPlaceholder(':$1', this.toString(this.min));

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

	private normalize(date: Date | string): Date | undefined | null {
		if (date instanceof Date) {
			return date;
		}

		if (typeof date === 'string') {
			if (this.isDate(date) === true) {
				return new Date(date);
			}

			const value = this.formData.get(date)?.toString();

			if (value === null) {
				return null;
			}

			if (this.isDate(value) === true) {
				return new Date(value);
			}
		}

		return undefined;
	}

	private equal(): string | undefined {
		if (this.min instanceof Date && this.value.getTime() === this.min.getTime()) {
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
		if (this.max === null) {
			return undefined;
		}

		if (this.max === undefined) {
			return this.onFailure.message(
				'The :attribute field or the comparison date or field is not a valid date.'
			);
		}

		if (this.min > this.max) {
			return this.onFailure.message(
				'The :attribute field or the comparison date or field is not a valid date.'
			);
		}

		if (this.value >= this.min && this.value <= this.max) {
			return undefined;
		}

		return this.onFailure.addPlaceholder(':$2', this.toString(this.max)).message(this.message);
	}

	private isDate(value: Date | string | FormDataEntryValue): boolean {
		if (value instanceof Date) {
			if (isNaN(value.getTime())) {
				return false;
			}

			return true;
		}

		if (typeof value === 'string' && this.isDateString(value)) {
			return true;
		}

		return false;
	}

	private isDateString(value: string): boolean {
		if (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) {
			let date = new Date(value);

			if (isNaN(date.getTime())) {
				return false;
			}

			return true;
		}

		return false;
	}

	private toString(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		if (hours === '00' && minutes === '00') {
			return `${year}-${month}-${day}`;
		}

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	setMin(date: Date | string): this {
		this.$1 = date;

		return this;
	}

	setMax(date: Date | string): this {
		this.$2 = date;

		return this;
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}
}
