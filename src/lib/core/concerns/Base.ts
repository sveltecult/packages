import type { InputTypes } from '$lib/types.js';
import ValidationFailed from '$lib/core/ValidationFailed.js';

export default class Base {
	protected type: InputTypes;

	protected onFailure: ValidationFailed;

	protected message: string;

	protected attribute: string;

	protected value: any;

	protected formData: FormData;

	setType(type: InputTypes): this {
		this.type = type;

		return this;
	}
}
