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

const router = new Router()
	.is('/', [
		async (event) => {
			console.log('middleware 1');
		},
		async (event) => {
			console.log('middleware 2');
		}
	])
	.is('/auth/login', async (e) => {
		console.log('guest middleware');
	})
	.is('/admin/users/[id]', [
		async (event) => {
			console.log('auth middleware');
		},
		async (event) => {
			throw error(403, 'Insufficient privilege');
		}
	]);

export const handle = router.build.bind(route);
```

### Grouping routes

If you have routes that share the same middleware, you can use the `.group()` function:

```typescript
import { Router, RouterGroup } from '@sveltecult/sveltekit-router';

const router = new Router().group(
	(RouterGroup: RouterGroup) => {
		RouterGroup.is('/auth/login');
		RouterGroup.is('/auth/register', async (e) => {
			console.log('overriding the global guest middleware');
		});
	},
	async (e) => {
		console.log('guest');
	}
);

export const handle = router.build.bind(router);
```

Our example above was supposed to log `"guest"` for both `/auth/login` and `/auth/register` pages. However, when you pass second argument to `RouterGroup.is('/auth/register')`, it will override its global middleware.

### Using with the `sequence()` function

Because our router instance is just another `Handle`, you can use the `sequence()` function:

```typescript
import { Router } from '@sveltecult/sveltekit-router';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const router = new Router().is('/', [
	async (event) => {
		console.log('do something');
	}
]);

const handle2: Handle = ({ event, resolve }) => {
	console.log('do another thing');

	return resolve(event);
};

export const handle = sequence(router.build.bind(router), handle2);
```

## Available Functions:

### `.is(id: string, middleware: Middleware | Middleware[])`

The primary purpose of `.is()` is to attach middleware functions to specific routes. When a request matches a given route, the associated middleware functions defined through `.is()` will be executed in the order they are provided.

You can pass the following options to the `.is()` function:

#### `id` (required)

**type:** `string`

**description:** A string representing the route path or pattern within your application. It can include dynamic segments indicated by square brackets (e.g., `/admin/users/[id]`) to match various paths dynamically.

#### `middleware`

**type:** `Middleware | Middleware[]`

**description:** This parameter accepts either a single middleware function or an array of middleware functions. These functions adhere to the `Middleware` type, which should accept an `event` parameter and must return a `Promise<void>`.

### `.group(callback: Function, middleware: Middleware | Middleware[])`

The `.group()` function can group routes that share the same middleware.

You can pass the following options to the `.group()` function:

#### `callback` (required)

**type:** `Function`

**description:** A callback containing route definitions with the same middleware.

#### `middleware`

**type:** `Middleware | Middleware[]`

**description:** This will serve as the global middleware for the grouped routes. It accepts either a single middleware function or an array of middleware functions. These functions adhere to the `Middleware` type, which should accept an `event` parameter and must return a `Promise<void>`.

### `.build(input: { event: RequestEvent, resolve: Resolve })`

The `.build()` function is typically called at the end of defining routes and middleware. It processes the incoming request against the defined routes, identifies the matching route, and then executes the associated middleware functions in the order they were defined using `.is()`. And then return the response using the built-in `resolve(event)` function.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
