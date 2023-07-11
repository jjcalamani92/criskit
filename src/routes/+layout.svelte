<script>
	import { page } from '$app/stores';

	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	{#if !$page.url.pathname.startsWith('/dashboard')}
	<Header />
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

