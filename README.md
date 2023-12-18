# SvelteKit Crypto

Collections of useful cryptographic helper functions designed to simplify common tasks such as hashing passwords, encoding and decoding JSON Web Tokens (JWT) for SvelteKit.

## Installation

To install, use your preferred package manager:

```bash
npm install @sveltecult/sveltekit-crypto
```

## Getting Started

To start using this library, you must first set an `APP_KEY` variable to your `.env` file.

```env
APP_KEY=
```

## Basic Usage

```typescript
import { Hash } from "@sveltecult/sveltekit-crypto";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const hash = await Hash.make('secret');

		console.log(hash)
	}
};
```

## Available Helpers:

### `Hash.make(password: string, options?: Argon2Options)`

Asynchronously generates a hash for a given password using Argon2.

### `Hash.check(hash: string, password: string, options?: Argon2Options)`

Asynchronously verifies a password against its hash using Argon2.

### `Jwt.encode(claims: Claims, header?: Header, abortSignal?: AbortSignal | undefined | null)`

Asynchronously encodes a set of claims into a JSON Web Token (JWT) using a specified header and secret key.

### `Jwt.decode(token: string, validation?: Validation, abortSignal?: AbortSignal | undefined | null)`

Asynchronously decodes a JSON Web Token (JWT) using a secret key and performs validation.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
