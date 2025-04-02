<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';

	let { children } = $props();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<div class="h-screen overflow-hidden bg-neutral-500 text-white">
		{@render children()}
	</div>
</QueryClientProvider>
