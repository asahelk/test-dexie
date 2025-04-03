<script lang="ts">
	import type { Container } from '$lib/types/types';

	import Filter from './Filter.svelte';

	export let container: Container;
</script>

<div class="flex w-48 flex-col items-center bg-neutral-600">
	<div class="mb-2 flex w-full flex-col gap-2">
		<span class="w-full bg-pink-950 text-center hover:bg-amber-300">{container.text}</span>
		<span class=" w-full bg-pink-950 text-center hover:bg-amber-300">{container.text}</span>
	</div>

	<div class="flex w-full flex-col gap-4 overflow-y-scroll">
		{#each container.filters as filter}
			<Filter bind:filter />
		{/each}
		<!-- {#if $localItems}
			{#each $localItems as filter}
				<Filter {filter} />
			{/each}
		{/if} -->
	</div>
</div>
