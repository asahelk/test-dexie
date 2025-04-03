<script lang="ts">
	import db from '$lib/db/db';
	import { pokemonFeedItems } from '$lib/store/persistStore';
	import type { Filter, Item } from '$lib/types/types';
	import { createQuery } from '@tanstack/svelte-query';
	import { liveQuery, type Observable } from 'dexie';
	import { onMount } from 'svelte';

	import { writable, type Writable } from 'svelte/store';
	import VirtualList from './VirtualList/VirtualList.svelte';

	export let filter: Filter;

	let { query, name } = filter;
	// let items: Item[] = [];

	// let syncWorker: Worker | undefined = undefined;

	// const onWorkerMessage = (event: MessageEvent) => {
	// 	const { data } = event;
	// 	items = data;
	// };

	// const loadWorker = async () => {
	// 	const SyncWorker = await import('$lib/worker/worker.js?worker');
	// 	syncWorker = new SyncWorker.default();

	// 	syncWorker.onmessage = onWorkerMessage;

	// 	syncWorker.postMessage({ query });

	// 	// const worker = new Worker('$lib/worker/worker.js?worker');
	// 	// worker.postMessage({ query });
	// };

	// onMount(loadWorker);

	const key = query as keyof typeof filter;

	const access = (str: string) => {
		return $pokemonFeedItems[str as keyof typeof $pokemonFeedItems];
	};

	let queryResult = createQuery<Observable<Item[]> | Writable<Item[]>, Error>({
		queryKey: ['item', filter.id],
		// queryFn: async () => {
		// 	if (query) return await db.feedItem.where('query').equals(query).toArray();
		// 	return [];
		// }
		queryFn: async () => {
			if (query)
				return liveQuery(async () => {
					return await db.feedItem.where('query').equals(query).toArray();
				});
			return new Promise((resolve) => resolve(writable<Item[]>([])));
		}
		// queryFn: async () =>
		// 	liveQuery(async () => {
		// 		// await new Promise((resolve) => setTimeout(resolve, 2000));

		// 		return db.feedItem.where('query').equals(query).toArray();
		// 	})
		// queryFn: async () =>
		// 	await fetch('https://api.github.com/repos/SvelteStack/svelte-query').then((r) => r.json())
	});

	// let data: Writable<Item[]> | Observable<Item[]> = writable([]);

	// $: if ($queryResult.isSuccess) {
	// 	data = $queryResult.data;
	// }

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
		// $queryResult.refetch();
	}
</script>

<!-- {JSON.stringify($queryResult)} -->
<div class="flex flex-col gap-2 bg-neutral-800">
	<div class="bg-amber-950 hover:bg-amber-900">
		<span>{name}</span>
		<!-- <span>{items.length}</span> -->
		<!-- <span>{($localItems ?? []).length}</span> -->
	</div>
	<div class="flex max-h-svh flex-col gap-4">
		<!-- {#await $localItems}
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
		{/await} -->

		<!-- {#if $queryResult.isLoading}
			Loading...
		{/if}
		{#if $queryResult.error}
			An error has occurred:
			{$queryResult.error.message}
		{/if}
		{#if $queryResult.isSuccess}
			{#each $queryResult.data as item}
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
		{/if} -->

		<!-- {#each items as item, index (item.id)}
			<button
				class="flex cursor-pointer flex-col bg-violet-950 hover:bg-violet-900"
				class:is-copied={item.isCopied}
				onclick={() => onClickItem({ item })}
			>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
				<div>{item.name}</div>
				<div>{item.ivs}</div>
				<div>{item.localTimeZone}</div>
				<div>{item.locationName}</div>
			</button>
		{/each} -->

		<!-- <VirtualList width="100%" height={600} itemCount={items.length} itemSize={720}>
			<div slot="item" let:index let:style {style}>
				{@const item = items[index]}
				<button
					class="flex cursor-pointer flex-col bg-violet-950 hover:bg-violet-900 w-full"
					class:is-copied={item.isCopied}
					onclick={() => onClickItem({ item })}
				>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
					<div>{item.name}</div>
					<div>{item.ivs}</div>
					<div>{item.localTimeZone}</div>
					<div>{item.locationName}</div>
				</button>
			</div>
		</VirtualList> -->

		{#if $localItems}
			<VirtualList width="100%" itemCount={$localItems.length} itemSize={120}>
				<div slot="item" let:index let:style {style}>
					{@const item = $localItems[index]}
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
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
						<div>{item.name}</div>
						<div>{item.ivs}</div>
						<div>{item.localTimeZone}</div>
						<div>{item.locationName}</div>
						<div>{item.isCopied}</div>
					</button>
				</div>
			</VirtualList>
		{/if}

		<!-- {#if $queryResult.isLoading}
			Loading...
		{/if}
		{#if $queryResult.error}
			An error has occurred:
			{$queryResult.error.message}
		{/if}
		{#if $queryResult.isSuccess}
			{#if $data}
				<VirtualList width="100%" height={600} itemCount={$data.length} itemSize={120}>
					<div slot="item" let:index let:style {style}>
						{@const item = $data[index]}
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
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
							<div>{item.name}</div>
							<div>{item.ivs}</div>
							<div>{item.localTimeZone}</div>
							<div>{item.locationName}</div>
							<div>{item.isCopied}</div>
						</button>
					</div>
				</VirtualList>
			{/if}
		{/if} -->
	</div>
</div>

<style>
	.is-copied {
		background-color: oklch(0.443 0.11 240.79);
	}
</style>
