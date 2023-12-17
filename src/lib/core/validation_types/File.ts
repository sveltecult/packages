import File from '$lib/core/concerns/Files.js';
import Base from './Base.js';

/**
 * Class: FileValidation
 *
 * The FileValidation class extends the Base class and provides file-specific validation rules.
 *
 * @extends Base
 */
export default class FileValidation extends Base {
	/**
	 * Constructor for the FileValidation class.
	 *
	 * @param {string} [message] - Optional custom error message for the validation rule.
	 */
	constructor(message: string) {
		super('file', message);
	}

	/**
	 * Specifies allowed MIME types for the attribute file.
	 * @param mimes - Allowed MIME type(s) for the file. Can be a string or an array of strings.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid file format".
	 * @returns Current instance of the FileValidation class for method chaining.
	 */
	mimeTypes(
		mimes: string | string[],
		message: string = 'The :attribute field has an invalid file format'
	): this {
		const rule = new File(message).setRule('mimeTypes').setMimes(mimes).setType('file');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'mimeTypes' method.
	 */
	mimeType = this.mimeTypes;

	/**
	 * Specifies allowed file extensions for the attribute file.
	 * @param extensions - Allowed file extension(s) for the file. Can be a string or an array of strings.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid file format".
	 * @returns Current instance of the FileValidation class for method chaining.
	 */
	extensions(
		extensions: string | string[],
		message: string = 'The :attribute field has an invalid file format'
	): this {
		const rule = new File(message).setRule('extensions').setExtensions(extensions).setType('file');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}

	/**
	 * Alias for the 'extensions' method.
	 */
	extension = this.extensions;

	/**
	 * Specifies that the attribute file must be an image.
	 * @param message - Custom error message for validation failure.
	 *                 Defaults to "The :attribute field has an invalid file format".
	 * @returns Current instance of the FileValidation class for method chaining.
	 */
	image(message: string = 'The :attribute field has an invalid file format'): this {
		const rule = new File(message)
			.setRule('mimeTypes')
			.setMimes(['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'])
			.setType('file');

		this.callstacks.push(rule.validate.bind(rule));

		return this;
	}
}
