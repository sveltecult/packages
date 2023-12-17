import pluralize from 'pluralize';
import { nanoid } from 'nanoid';
import obfuscate from 'obfuscate-mail';
import slugify from 'slugify';

/**
 * Helper class containing string-related functions.
 */
export default class Str {
	/**
	 * Pluralizes a word based on the given number and settings.
	 * Using the "pluralize" library under the hood.
	 * @param word - The word to be pluralized.
	 * @param number - The number used to determine pluralization.
	 * @param inclusive - Optional. If set to true, includes the number and the pluralized word in the output.
	 * @returns The pluralized word or a string containing the number and the pluralized word if inclusive is true.
	 */
	static pluralize = pluralize;

	/**
	 * Obfuscates a string by partially hiding some characters.
	 * @param {string} text - The text to be obfuscated.
	 * @param {number} options - Number of characters to show or configuration options if text is a valid email.
	 * @returns {string} - The obfuscated email address.
	 */
	static obfuscate = (text: string, options?: number | object): string => {
		if (
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				text
			)
		) {
			return obfuscate(text, typeof options === 'object' ? options : {});
		}

		const hint = typeof options === 'number' ? options : 0;

		if (hint <= 0) {
			return '*'.repeat(text.length);
		}

		if (text.length <= hint) {
			return text.slice(0, 1) + '*'.repeat(text.length - 1);
		}

		try {
			const start = text.slice(0, hint);
			const end = text.slice(-hint);
			const middle = '*'.repeat(text.length - 2 * hint);

			return start + middle + end;
		} catch (e) {
			return '*'.repeat(text.length);
		}
	};

	/**
	 * Generates a URL-friendly random string of the specified size.
	 * Using the "nanoid" library under the hood.
	 * @param {number} size - The length of the random string to be generated.
	 * @returns {string} - The URL-friendly random string of the specified size.
	 */
	static random = nanoid;

	/**
	 * Slugifies a text.
	 * Using the "slugify" library under the hood.
	 * @param {string} text - The text to be slugified.
	 * @param {object} options - The slugify configuration options.
	 * @returns {string} - The URL-friendly random string of the specified size.
	 */
	static slugify = slugify.default;
}
