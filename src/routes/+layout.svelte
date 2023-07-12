<script>
	import { page } from '$app/stores';
	import Headers from '$lib/components/headers/Headers.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';

	import Header from './Header.svelte';
	import './styles.css';
</script>



<div class="app">
	{#if !$page.url.pathname.startsWith('/dashboard')}
	<Headers />
	<!-- <Header /> -->
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

