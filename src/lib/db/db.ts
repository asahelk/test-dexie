import type { Item } from '$lib/types/types';
import Dexie, { type Table } from 'dexie';
// import { getWebWorkerDB } from 'dexie-worker';

export class MyDexieExtension extends Dexie {
	feedItem!: Table<Item>;

	constructor() {
		super('pokelist.db');
		this.version(1).stores({
			feedItem: '++id, name, despawnTime, lv, iv, cp, atk, def, hp, query'
		});
	}
}

const db = new MyDexieExtension();
db.open();
// const db = getWebWorkerDB(_db, { workerUrl: '/dexieWorker.js' });
export default db;
