<script>
	import { page } from '$app/stores';
	import Headers from '$lib/components/headers/Headers.svelte';
	import './styles.css';
	import 'bytemd/dist/index.css'

</script>



<div >
	{#if !$page.url.pathname.startsWith('/dashboard')}
		<Headers />
	{/if}

	<main>
		<slot />
	</main>

	{#if !$page.url.pathname.startsWith('/dashboard')}
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
	{/if}
</div>

