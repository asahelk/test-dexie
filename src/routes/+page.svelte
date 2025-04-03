<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import feedItems from '$lib/data/pokefeeditems.json';
	import db from '$lib/db/db.js';
	import type { Item } from '$lib/types/types.js';

	export let data;

	const { containersPromise, containers } = data;

	function fillData() {
		const flatItems: Item[] = Object.values(feedItems).flat();

		db.feedItem
			.bulkAdd(flatItems)
			.then(() => {
				console.log('Done!');
			})
			.catch((error) => {
				if (error.name === 'BulkError') {
					// Explicitly catching the bulkAdd() operation makes those successful
					// additions commit despite that there were errors.
					console.error(error.failures.length);
				} else {
					throw error; // we're only handling BulkError specifically here...
				}
			});
	}

	function addSingleItem() {
		const newItem: Item = {
			name: 'Venasaur',
			hasShiny: true,
			isBoosted: false,
			gender: 'male',
			ivs: '1/12/5',
			iv: '40.00',
			atk: 1,
			def: 12,
			hp: 5,
			cp: '733',
			lv: '27',
			despawnTime: 1740602693000,
			flag: '🇺🇸',
			locationName: 'Shavano Park, United States',
			coords: '29.572283,-98.600307',
			moves: null,
			weather: null,
			localTimeZone: 'America/Chicago',
			query: '1'
		};
		db.feedItem.add(newItem);
	}
</script>

<div class="mb-8 flex items-center justify-end gap-4">
	<button class="h-14 rounded bg-red-900 p-4 hover:bg-amber-900" onclick={fillData}
		>Add items to IndexedDB</button
	>
	<button class="h-14 rounded bg-red-900 p-4 hover:bg-amber-900" onclick={addSingleItem}
		>Add single Item</button
	>
</div>
<div class="flex h-full justify-center gap-8">
	<!-- {#await containersPromise}
		<div class="flex items-center justify-center">
			<span class="bg-sky-700 h-full flex items-center hover:bg-red-900">LOADING...</span>
		</div>
	{:then containers}
		{#each containers as container}
			<Container {container} />
		{/each}
	{/await} -->

	{#each containers as container}
		<Container bind:container />
	{/each}
</div>
