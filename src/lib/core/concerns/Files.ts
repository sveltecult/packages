import type { ValidationRules } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';
import Base from './Base.js';
import { fileTypeFromBlob } from 'file-type/core';
import type { FileTypeResult } from 'file-type/core';

type Rule = 'mimeTypes' | 'extensions';

export default class Files extends Base implements ValidationRules {
	protected rule: Rule;

	protected mimes: string[] = [];

	protected exts: string[] = [];

	constructor(message: string) {
		super();

		this.message = message;
	}

	async validate(attribute: string, value: any, formData?: FormData): Promise<string | undefined> {
		if (value === null) {
			return;
		}

		this.onFailure = new ValidationFailed({
			':attribute': attribute
		});
		this.attribute = attribute;
		this.value = value;
		this.formData = formData;

		if (value instanceof Blob) {
			if (value.size === 0) {
				return undefined;
			}

			const type = await fileTypeFromBlob(value);

			if (type === undefined) {
				return this.onFailure.message(this.message);
			}

			switch (this.rule) {
				case 'mimeTypes':
					return this.mimeTypes(type);

				case 'extensions':
					return this.extensions(type);
			}
		}
	}

	private mimeTypes(type: FileTypeResult): string | undefined {
		if (!this.mimes.includes(type.mime)) {
			return this.onFailure.message(this.message);
		}
	}

	private extensions(type: FileTypeResult): string | undefined {
		if (!this.exts.includes(type.ext)) {
			return this.onFailure.message(this.message);
		}
	}

	setRule(rule: Rule): this {
		this.rule = rule;

		return this;
	}

	setMimes(mimes: string | string[]): this {
		if (Array.isArray(mimes)) {
			this.mimes = mimes;
		} else {
			this.mimes = [mimes];
		}

		return this;
	}

	setExtensions(extensions: string | string[]): this {
		if (Array.isArray(extensions)) {
			this.exts = extensions;
		} else {
			this.exts = [extensions];
		}

		return this;
	}
}
