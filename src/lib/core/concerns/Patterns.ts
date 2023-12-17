import type { ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';

type Rule = 'regex' | 'notRegex';

export default class Patterns extends Base implements ValidationRules {
	protected rule: Rule;

	protected pattern: RegExp;

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData?: FormData): Promise<string | undefined> {
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
			case 'regex':
				return this.regex();

			case 'notRegex':
				return this.notRegex();
		}
	}

	private regex(): string | undefined {
		if (this.pattern.test(this.value)) {
			return undefined;
		}

		return this.onFailure.message(this.message);
	}

	private notRegex(): string | undefined {
		if (this.pattern.test(this.value)) {
			return this.onFailure.message(this.message);
		}

		return undefined;
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}

	setPattern(pattern: RegExp): this {
		this.pattern = pattern;

		return this;
	}
}
