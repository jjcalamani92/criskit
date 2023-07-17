<script >
	import StackedLayouts from '$lib/components/StackedLayouts.svelte';

	export let data;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard Page Description" />
</svelte:head>

<StackedLayouts />

<!-- <PageHeadings /> -->
<slot />
<!-- <main>
	<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
	</div>
</main> -->
