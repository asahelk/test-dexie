import type { PageServerLoad } from './$types';
import containers from '$lib/data/containers.json';
import type { Containers } from '$lib/types/types';

export const load: PageServerLoad = async () => {
	// await new Promise((r) => setTimeout(r, 2000));

	const myPromise = new Promise<Containers>((resolve) => {
		setTimeout(() => {
			resolve(containers as Containers);
		}, 0);
	});

	return { containersPromise: myPromise, containers: containers as Containers };
};
