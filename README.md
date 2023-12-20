# SvelteKit Router

This library facilitates per-route multiple middleware for SvelteKit applications. It simplifies middleware management and execution for different routes within your application.

## Why

The motivation behind the creation of this library includes:

- **Expressive Syntax:** Offers a more expressive syntax compared to manually implementing middleware using conditional logic `(if (event.url.pathname.startsWith('/custom')) {})`.
- **Single Source of Truth:** Centralizes middleware management within the `hooks.server.ts` file, reducing the need to disperse middleware logic across multiple files.
- **Promotes Reusability:** Encourages the reuse of middleware functions across various routes, fostering cleaner and more maintainable code.

## Caveats

- **Error Handling:** If an error is thrown within the middleware, the library does not automatically utilize the `error.svelte file`. Instead, you'll need to create a custom error handling file at `src/error.html`.

## Installation

To install, use your preferred package manager:

```bash
npm install @sveltecult/sveltekit-router
```

## Basic Usage

```typescript
import { Router } from '@sveltecult/sveltekit-router';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	return new Router()
		.is('/', [
			async ({ event, resolve }) => {
				console.log('middleware 1');
			},
			async ({ event, resolve }) => {
				console.log('middleware 2');
			}
		])
		.is('/auth/login', async ({ event, resolve }) => {
			console.log('guest middleware');
		})
		.is('/admin/users/[id]', [
			async ({ event, resolve }) => {
				console.log('auth middleware');
			},
			async ({ event, resolve }) => {
				throw error(403, 'Insufficient privilege');
			}
		])
		.build({ event, resolve });
}
```

## Available Functions:

### `.is(id: string, middleware: Middleware | Middleware[])`

The primary purpose of `.is()` is to attach middleware functions to specific routes. When a request matches a given route, the associated middleware functions defined through `.is()` will be executed in the order they are provided.

You can pass the following options to the `.is()` function:

#### `id`

**type:** `string`

**description:** A string representing the route path or pattern within your application. It can include dynamic segments indicated by square brackets (e.g., `/admin/users/[id]`) to match various paths dynamically.

#### `middleware`

**type:** `Middleware | Middleware[]`

**description:** This parameter accepts either a single middleware function or an array of middleware functions. These functions adhere to the `Middleware` type, which should accept a destructured object containing `{ event, resolve }` and must return a `Promise<void>`.

### `.build({ event, resolve })`

The `.build()` function is typically called at the end of defining routes and middleware. It processes the incoming request against the defined routes, identifies the matching route, and then executes the associated middleware functions in the order they were defined using `.is()`. And then return the response using the built-in `resolve(event)` function.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
