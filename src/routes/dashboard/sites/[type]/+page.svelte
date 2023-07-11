<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListSites from '$lib/components/ListSites.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
	import FormSite from '$lib/components/forms/FormSite.svelte';
   
    export let data;
		// console.log('data', data)
</script>
<FormsSlideOvers title={'New Site'} >
	<FormSite {data} />
</FormsSlideOvers>
<PageHeadings />
<ListSites sites={data.sites}/>
