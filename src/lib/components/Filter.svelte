<script lang="ts">
	import db from '$lib/db/db';
	import { pokemonFeedItems } from '$lib/store/persistStore';
	import type { Filter, Item } from '$lib/types/types';
	import { liveQuery } from 'dexie';
	import { onMount } from 'svelte';

	export let filter: Filter;

	let { query, name } = filter;

	const key = query as keyof typeof filter;

	const access = (str: string) => {
		return $pokemonFeedItems[str as keyof typeof $pokemonFeedItems];
	};

	let localItems = liveQuery(async () => {
		// await new Promise((resolve) => setTimeout(resolve, 2000));

		return db.feedItem.where('query').equals(query).toArray();
	});

	// let items: Item[] = access(query) ?? [];

	// let items: Item[] = [];

	// onMount(()=>{
	//     items = access(query) ?? [];
	// })
	function onClickItem({ item }: { item: Item }) {
		db.feedItem.put({ ...item, isCopied: !item.isCopied });
	}
</script>

<div class="flex flex-col gap-2 bg-neutral-800">
	<div class="bg-amber-950 hover:bg-amber-900">
		<span>{name}</span>
		<!-- <span>{items.length}</span> -->
		<span>{($localItems ?? []).length}</span>
	</div>
	<div class="flex flex-col gap-4">
		{#await $localItems}
			Loading....xc
		{:then items}
			{#each items as item}
				<button
					class="flex cursor-pointer flex-col bg-violet-950 hover:bg-violet-900"
					class:is-copied={item.isCopied}
					onclick={() => onClickItem({ item })}
				>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.isCopied}</div>
				</button>
			{/each}
		{/await}

		<!-- {#each items as item}
			<div class="flex flex-col bg-violet-950 hover:bg-violet-900">
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
			</div>
		{/each} -->
	</div>
</div>

<style>
	.is-copied {
		background-color: oklch(0.443 0.11 240.79);
	}
</style>
