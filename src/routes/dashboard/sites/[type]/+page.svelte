<script>
	import ListSites from '$lib/components/ListSites.svelte';
	import FormSite from '$lib/components/forms/FormSite.svelte';
	import { page } from '$app/stores';
	import { capitalizeName } from '$lib/utils/capitalize.js';
	import Headings from '$lib/components/Headings.svelte';
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	
    export let data;
</script>
<FormsSlideOversAdd title={'New Site'} >
	<FormSite {data} />
</FormsSlideOversAdd>
<Headings title={`Sites ${capitalizeName($page.params.type)}`} />

<ListSites sites={data.sites}/>
