import type { ValidationRules, FnWhen } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule =
	| 'required'
	| 'requiredWhen'
	| 'prohibited'
	| 'prohibitedWhen'
	| 'requiredSome'
	| 'requiredSomeWhen'
	| 'confirmed'
	| 'matches'
	| 'mismatches'
	| 'different'
	| 'same';

export default class Inputs extends Base implements ValidationRules {
	protected matchingFieldOrText: string;

	protected fn?: FnWhen;

	protected rule: Rule;

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData?: FormData): Promise<string> {
		this.onFailure = new ValidationFailed({
			':attribute': attribute
		});
		this.attribute = attribute;
		this.value = value;
		this.formData = formData;

		switch (this.rule) {
			case 'required':
				return this.required();

			case 'requiredWhen':
				return await this.requiredWhen();

			case 'prohibited':
				return this.prohibited();

			case 'prohibitedWhen':
				return await this.prohibitedWhen();

			case 'requiredSome':
				return this.requiredSome();

			case 'requiredSomeWhen':
				return await this.requiredSomeWhen();

			case 'confirmed':
				return this.confirmed();

			case 'matches':
				return this.matches();

			case 'mismatches':
				return this.mismatches();

			case 'different':
				return this.different();

			case 'same':
				return this.same();
		}
	}

	private required(): string | undefined {
		if (Array.isArray(this.value)) {
			if (this.all() === false) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}

		if (this.has() === false) {
			return this.onFailure.message(this.message);
		}
	}

	private async requiredWhen(): Promise<string | undefined> {
		const fn = await this.fn(this.attribute, this.value, this.formData);

		if (Array.isArray(this.value)) {
			if (fn === true && this.all() === false) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}

		if (fn === true && this.has() === false) {
			return this.onFailure.message(this.message);
		}
	}

	private requiredSome(): string | undefined {
		if (Array.isArray(this.value)) {
			if (this.some() === false) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}
	}

	private async requiredSomeWhen(): Promise<string | undefined> {
		const fn = await this.fn(this.attribute, this.value, this.formData);

		if (Array.isArray(this.value)) {
			if (fn === true && this.some() === false) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}
	}

	private prohibited(): string | undefined {
		if (Array.isArray(this.value)) {
			if (this.some() === true) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}

		if (this.has() === true) {
			return this.onFailure.message(this.message);
		}
	}

	private async prohibitedWhen(): Promise<string | undefined> {
		const fn = await this.fn(this.attribute, this.value, this.formData);

		if (Array.isArray(this.value)) {
			if (fn === true && this.some() === true) {
				return this.onFailure.message(this.message);
			}

			return undefined;
		}

		if (fn === true && this.has() === true) {
			return this.onFailure.message(this.message);
		}
	}

	private confirmed() {
		const confirmation =
			this.formData.get(`${this.attribute}_confirmation`) ||
			this.formData.get(`${this.attribute}Confirmation`);

		if (this.value === confirmation) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private matches() {
		if (this.value === this.formData.get(this.matchingFieldOrText)) {
			return undefined;
		}

		return this.onFailure.addPlaceholder(':$1', this.matchingFieldOrText).message(this.message);
	}

	private mismatches() {
		if (this.value !== this.formData.get(this.matchingFieldOrText)) {
			return undefined;
		}

		return this.onFailure.addPlaceholder(':$1', this.matchingFieldOrText).message(this.message);
	}

	private same() {
		if (this.value === this.matchingFieldOrText) {
			return undefined;
		}

		return this.onFailure.addPlaceholder(':$1', this.matchingFieldOrText).message(this.message);
	}

	private different() {
		if (this.value !== this.matchingFieldOrText) {
			return undefined;
		}

		return this.onFailure.addPlaceholder(':$1', this.matchingFieldOrText).message(this.message);
	}

	private has(): boolean {
		const value = this.value;

		if (value === null) {
			return false;
		}

		if (value instanceof Blob && value.size === 0) {
			return false;
		}

		if (typeof value === 'string' && value.trim() === '') {
			return false;
		}

		return true;
	}

	private values(): any[] {
		return this.value.map((value: any) => {
			if (value instanceof Blob && value.size === 0) {
				return false;
			}

			if (typeof value === 'string' && value.trim() === '') {
				return false;
			}

			return true;
		});
	}

	private all(): boolean {
		return this.values().every((value: boolean) => value === true);
	}

	private some(): boolean {
		return this.values().some((value: boolean) => value === true);
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}

	setFn(fn: FnWhen): this {
		this.fn = fn;

		return this;
	}

	setMatchingFieldOrText(field: string): this {
		this.matchingFieldOrText = field;

		return this;
	}
}
