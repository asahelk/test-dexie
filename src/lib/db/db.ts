import type { Item } from "$lib/types/types";
import Dexie, { type Table } from "dexie";

export class MyDexieExtension extends Dexie {
	feedItem!: Table<Item>;

	constructor() {
		super("pokelist.db");
		this.version(1).stores({
			feedItem: "++id, name, despawnTime, lv, iv, cp, atk, def, hp, query",
		});
	}
}

const db = new MyDexieExtension();
export default db;
