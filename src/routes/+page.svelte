<script lang="ts">
	import Container from '$lib/components/Container.svelte';

	export let data;

	const { containersPromise, containers } = data;
</script>

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
		<Container {container} />
	{/each}
</div>
