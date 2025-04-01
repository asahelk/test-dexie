<script lang="ts">
	import { pokemonFeedItems } from '$lib/store/persistStore';
	import type { Filter, Item } from '$lib/types/types';
	import { onMount } from 'svelte';

	export let filter: Filter;

	let { query, name } = filter;

	const key = query as keyof typeof filter;

	const access = (str: string) => {
		return $pokemonFeedItems[str as keyof typeof $pokemonFeedItems];
	};

	let items: Item[] = access(query) ?? [];
    // let items: Item[] = [];
    
    // onMount(()=>{
    //     items = access(query) ?? [];
    // })
</script>

<div class="bg-neutral-800 flex flex-col gap-2">
	<div class="bg-amber-950 hover:bg-amber-900">
		<span>{name}</span>
		<span>{items.length}</span>
	</div>
    <div class="flex flex-col gap-4">
	{#each items as item}
		<div class="flex flex-col bg-violet-950 hover:bg-violet-900">
			<div>{item.name}</div>
			<div>{item.ivs}</div>
			<div>{item.localTimeZone}</div>
			<div>{item.locationName}</div>
		</div>
	{/each}
    </div>
</div>
