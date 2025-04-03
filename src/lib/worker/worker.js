import db from '$lib/db/db';
import { liveQuery } from 'dexie';

self.onmessage = async (event) => {
	const { query } = event.data;

	if (!query) return;

	const feddItemsObservable = liveQuery(() => db.feedItem.where('query').equals(query).toArray());

	feddItemsObservable.subscribe({
		next: (result) => self.postMessage(result),
		error: (error) => console.error(error)
	});
};
