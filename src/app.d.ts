// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Containers } from "$lib/types/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			containers: Containers;
			containersPromise: Promise<Containers>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
