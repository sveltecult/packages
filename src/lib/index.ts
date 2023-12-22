import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';

export type Resolve = (
	event: RequestEvent<Partial<Record<string, string>>, string>,
	opts?: ResolveOptions
) => MaybePromise<Response>;

export type Middleware = (event: RequestEvent) => Promise<void>;

export class RouterGroup {
	private routes: any[] = [];

	private m: Middleware[] = [];

	constructor(callback: Function, middleware: Middleware | Middleware[] = []) {
		this.m = Array.isArray(middleware) ? middleware : [middleware];

		callback(this);
	}

	is(id: string, middleware?: Middleware | Middleware[]) {
		let m: Middleware | Middleware[] = this.m;

		if (middleware) {
			m = Array.isArray(middleware) ? middleware : [middleware];
		}

		this.routes.push({
			id: id,
			middleware: m
		});
	}

	build() {
		return this.routes;
	}
}

export class Router {
	private routes: any[] = [];

	is(id: string, middleware: Middleware | Middleware[] = []) {
		let m: Middleware | Middleware[] = Array.isArray(middleware) ? middleware : [middleware];

		this.routes.push({
			id: id,
			middleware: m
		});

		return this;
	}

	group(callback: Function, middleware: Middleware | Middleware[] = []) {
		const routerGroup = new RouterGroup(callback, middleware).build();

		this.routes.push(...routerGroup);

		return this;
	}

	build: Handle = async (input: { event: RequestEvent; resolve: Resolve }): Promise<Response> => {
		const { event, resolve } = input;

		const route = this.routes.findLast((route) => route.id === event.route.id);

		if (route === undefined) {
			return resolve(event);
		}

		for (const m of route.middleware) {
			await m(event);
		}

		return resolve(event);
	};
}
