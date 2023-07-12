<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListSites from '$lib/components/ListSites.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
	import FormSite from '$lib/components/forms/FormSite.svelte';
	import { page } from '$app/stores';
	import { capitalizeName } from '$lib/utils/capitalize.js';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import Headings from '$lib/components/Headings.svelte';
	
    export let data;
		// console.log('data', data)
</script>
<FormsSlideOversAdd title={'New Site'} >
	<FormSite {data} />
</FormsSlideOversAdd>
<Headings title={`Sites ${capitalizeName($page.params.type)}`} />
<ListSites sites={data.sites}/>
