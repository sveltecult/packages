import type { FnWhen, ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule = 'accepted' | 'acceptedWhen' | 'declined' | 'declinedWhen';

export default class Decisions extends Base implements ValidationRules {
	protected fn: FnWhen;

	protected rule: Rule;

	protected positive = ['yes', 'on', '1', 1, true, 'true'];

	protected negative = ['no', 'off', '0', 0, false, 'false'];

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
		this.value = value;
		this.formData = formData;

		switch (this.rule) {
			case 'accepted':
				return this.accepted();

			case 'acceptedWhen':
				return await this.acceptedWhen();

			case 'declined':
				return this.declined();

			case 'declinedWhen':
				return await this.declinedWhen();
		}
	}

	private accepted(): string | undefined {
		if (!this.positive.includes(this.value)) {
			return this.onFailure.message(this.message);
		}
	}

	private async acceptedWhen(): Promise<string | undefined> {
		const fn = await this.fn(this.attribute, this.value, this.formData);

		if (fn === true && !this.positive.includes(this.value)) {
			return this.onFailure.message(this.message);
		}
	}

	private declined(): string | undefined {
		if (!this.negative.includes(this.value)) {
			return this.onFailure.message(this.message);
		}
	}

	private async declinedWhen(): Promise<string | undefined> {
		const fn = await this.fn(this.attribute, this.value, this.formData);

		if (fn === true && !this.negative.includes(this.value)) {
			return this.onFailure.message(this.message);
		}
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}

	setFn(fn: FnWhen): this {
		this.fn = fn;

		return this;
	}
}
