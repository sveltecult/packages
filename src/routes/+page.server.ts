import { Str } from '$lib/index.js';

export function load() {
	console.log(
		Str.slugify('Test string', {
			lower: true
		})
	);
}
