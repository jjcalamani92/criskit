<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListSites from '$lib/components/ListSites.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
   
    export let data;
		console.log('data', data)
</script>
<FormsSlideOvers >
	<FormPage />
</FormsSlideOvers>
<PageHeadings />
<ListSites sites={data.sites}/>
