import { APP_KEY } from '$env/static/private';

import { hash, verify, type Options as Argon2Options } from '@node-rs/argon2';
import {
	sign as encode,
	verify as decode,
	type Claims,
	type Header,
	type Validation
} from '@node-rs/jsonwebtoken';

export class Hash {
	/**
	 * Asynchronously generates a hash for a given password using Argon2.
	 * @param password - The password to be hashed.
	 * @param options - Optional Argon2 hashing options.
	 * @returns A promise that resolves to the hashed password.
	 */
	static async make(password: string, options?: Argon2Options) {
		return await hash(password, options);
	}

	/**
	 * Asynchronously verifies a password against its hash using Argon2.
	 * @param hash - The previously generated hash to compare against.
	 * @param password - The password to be verified.
	 * @param options - Optional Argon2 hashing options.
	 * @returns A promise that resolves to a boolean indicating whether the password matches the hash.
	 */
	static async check(hash: string, password: string, options?: Argon2Options) {
		return await verify(hash, password, options);
	}
}

export class Jwt {
	/**
	 * Asynchronously encodes a set of claims into a JSON Web Token (JWT) using a specified header and secret key.
	 * @param claims - The claims to be encoded into the JWT.
	 * @param header - Optional header to include in the JWT.
	 * @param abortSignal - Optional abort signal for the encoding process.
	 * @returns A promise that resolves to the encoded JWT.
	 */
	static async encode(
		claims: Claims,
		header?: Header,
		abortSignal?: AbortSignal | undefined | null
	) {
		return await encode(claims, APP_KEY, header, abortSignal);
	}

	/**
	 * Asynchronously decodes a JSON Web Token (JWT) using a secret key and performs validation.
	 * @param token - The JWT to be decoded.
	 * @param validation - Optional validation configuration for the JWT.
	 * @param abortSignal - Optional abort signal for the decoding process.
	 * @returns A promise that resolves to the decoded claims from the JWT.
	 */
	static async decode(
		token: string,
		validation?: Validation,
		abortSignal?: AbortSignal | undefined | null
	) {
		return await decode(token, APP_KEY, validation, abortSignal);
	}
}
