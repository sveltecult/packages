/**
 * Class: Errors
 *
 * The Errors class manages a collection of validation errors.
 */
export default class Errors {
  /**
   * The collection of errors.
   * @protected
   */
  protected errors: object;

  /**
   * Constructor for the Errors class.
   *
   * @param {object} errors - The initial collection of errors.
   */
  constructor(errors: object) {
    this.errors = errors;
  }

  /**
   * Retrieves all the errors.
   *
   * @returns {object} - The collection of all errors.
   */
  all(): object {
    return this.errors;
  }

  /**
   * Checks if there are any errors present.
   *
   * @returns {boolean} - Returns true if errors are present, otherwise returns false.
   */
  any(): boolean {
    return Object.keys(this.errors).length === 0 ? false : true;
  }

  /**
   * Retrieves the first error message for a given property.
   *
   * @param {string} property - The name of the property to retrieve the first error message for.
   * @returns {string} - The first error message for the specified property.
   */
  first(property: string): string {
    if (this.errors.hasOwnProperty(property)) {
      return this.errors[property][0];
    }

    return null;
  }

  /**
   * Retrieves the error message for a given property.
   *
   * @param {string} property - The name of the property to retrieve the error message for.
   * @returns {boolean} - The error message for the specified property.
   */
  get(property: string): boolean {
    if (this.errors.hasOwnProperty(property)) {
      return this.errors[property];
    }

    return null;
  }

  /**
   * Checks if errors contain messages for a specific property.
   *
   * @param {string} property - The name of the property to check for errors.
   * @returns {boolean} - Returns true if errors contain messages for the specified property, otherwise returns false.
   */
  has(property: string): boolean {
    return this.errors.hasOwnProperty(property);
  }

  /**
   * Adds an error message for a specific property.
   *
   * @param {string} property - The name of the property to add the error message for.
   * @param {string} message - The error message to be added.
   */
  add(property: string, message: string): void {
    if (!this.errors.hasOwnProperty(property)) {
      this.errors[property] = [];
    }

    this.errors[property].push(message);
  }

  /**
   * Clears error messages for a specific property or all properties if no property is provided.
   *
   * @param {string} [property] - Optional. The name of the property to clear error messages for.
   */
  clear(property?: string): void {
    if (property && this.errors.hasOwnProperty(property)) {
      delete this.errors[property];

      return;
    }

    this.errors = {};
  }
}
