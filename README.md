# Helpers

Collections of useful number and string helper functions designed to simplify common tasks such as pluralization, email obfuscation, random string generation, and more.

## Installation

To install, use your preferred package manager:

```bash
npm install @sveltecult/helpers
```

## Basic Usage

```typescript
import { Str, Num } from "@sveltecult/helpers";

const id = Str.random();
const email = Str.obfuscate("john@example.com");
const plural = Str.pluralize("cat", 3);
const OTP = Num.random(6);
```

## Available Helpers:

### `Str.pluralize(noun: string, count: number, inclusive?: boolean)`

Returns the plural form of a word based on the given count.

### `Str.obfuscate(text: string, hint?: number)`

Obfuscates a text. Useful for hiding sensitive information.

### `Str.random(length: number?)`

Generates a random string of the specified length.

### `Str.slugify(text: string, options: object)`

Slugifies a text.

### `Num.random(digits: number?)`

Generates a random number with the specified number of digits.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
