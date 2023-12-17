import type { Placeholder } from '$lib/types.js';

/**
 * Represents a class to handle validation failures.
 */
export default class ValidationFailed {
	/**
	 * Placeholder object containing key-value pairs of placeholders and their corresponding values.
	 */
	protected placeholders: Placeholder;

	/**
	 * Constructs a new ValidationFailed instance.
	 * @param placeholders - Placeholder object containing key-value pairs of placeholders and their corresponding values.
	 */
	constructor(placeholders: Placeholder) {
		this.placeholders = placeholders;
	}

	/**
	 * Replaces placeholders in the provided message with their corresponding values.
	 *
	 * @param message - The message containing placeholders to be replaced.
	 * @returns The updated message with placeholders replaced by their values.
	 */
	message(message: string): string {
		for (const placeholder in this.placeholders) {
			message = message.replace(placeholder, this.placeholders[placeholder]);
		}

		return message;
	}

	/**
	 * Adds or updates a placeholder in the Placeholder object.
	 *
	 * @param key - The key of the placeholder.
	 * @param value - The value to replace the placeholder.
	 * @returns The updated ValidationFailed instance with the new placeholder added or updated.
	 */

	addPlaceholder(key: string, value: string) {
		this.placeholders[key] = value;

		return this;
	}
}
