<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
   
    export let data;
</script>
<FormsSlideOvers >
	<FormPage />
</FormsSlideOvers>
<PageHeadings />
