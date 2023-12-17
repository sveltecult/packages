/**
 * Helper class containing number-related functions.
 */
export default class Num {
  /**
   * Generates a random number with the specified number of digits.
   * @param digits - The number of digits for the random number.
   * @returns A random number with the specified number of digits.
   */
  static random(digits: number = 4): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
