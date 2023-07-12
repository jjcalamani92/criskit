<script>
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import FormsSlideOversUpdate from '$lib/components/FormsSlideOversUpdate.svelte';
	import Headings from '$lib/components/Headings.svelte';
	import ListPages from '$lib/components/ListPages.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
	import FormSite from '$lib/components/forms/FormSite.svelte';
  export let data;
	// console.log('data', data)
</script>
<FormsSlideOversAdd title={'New Page'} >
	<FormPage {data} />
</FormsSlideOversAdd>
<FormsSlideOversUpdate title={'Edit Site'} >
	<FormSite {data} />
</FormsSlideOversUpdate>
<!-- <PageHeadings title={data.site.data.info.name} /> -->
<Headings title={data.site.data.info.name} />
<ListPages  pages={data.pages}/>
