<script lang="ts">
	import type { Container } from '$lib/types/types';

	import Filter from './Filter.svelte';

	export let container: Container;
</script>

<div class="flex w-48 flex-col bg-neutral-600 items-center ">
	<span class="bg-pink-950 w-full text-center mb-8">{container.text}</span>

	<div class="flex flex-col gap-4 w-full overflow-y-scroll">
		{#each container.filters as filter}
			<Filter {filter} />
		{/each}
	</div>
</div>
