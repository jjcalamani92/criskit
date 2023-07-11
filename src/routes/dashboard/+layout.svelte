<script >
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import StackedLayouts from '$lib/components/StackedLayouts.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';

	export let data;
</script>

<StackedLayouts />

<!-- <PageHeadings /> -->
<slot />
<!-- <main>
	<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
	</div>
</main> -->
