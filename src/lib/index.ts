import type { MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';

type Resolve = (
	event: RequestEvent<Partial<Record<string, string>>, string>,
	opts?: ResolveOptions
) => MaybePromise<Response>;

export type Middleware = (input: { event: RequestEvent; resolve: Resolve }) => Promise<void>;

export class Router {
	private routes: any[] = [];

	is(id: string, middleware: Middleware | Middleware[] = []) {
		let m: Middleware | Middleware[];

		if (Array.isArray(middleware)) {
			m = middleware;
		} else {
			m = [middleware];
		}

		this.routes.push({
			id: id,
			middleware: m
		});

		return this;
	}

	async build(input: { event: RequestEvent; resolve: Resolve }): Promise<Response> {
		const { event, resolve } = input;

		const route = this.routes.findLast((route) => route.id === event.route.id);

		if (route === undefined) {
			return resolve(event);
		}

		for (const m of route.middleware) {
			await m(input);
		}

		return resolve(event);
	}
}
