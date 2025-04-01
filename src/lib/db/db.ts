import type { Item } from '$lib/types/types';
import Dexie, { type Table } from 'dexie';

export class MyDexieExtension extends Dexie {
	favorite!: Table<Item>;

	constructor() {
		super('pokelist.db');
		this.version(1).stores({
			feedItem:
				'&id, name, hasShiny, isBoosted, gender, ivs, iv, atk, def, hp, cp, lv, despawnTime, flag, locationName, coords, moves, weather, localTimeZone, isCopied'
		});
	}
}
