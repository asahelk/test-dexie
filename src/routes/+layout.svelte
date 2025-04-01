<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-neutral-500 h-screen text-white overflow-hidden">
{@render children()}
</div>