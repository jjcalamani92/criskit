<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListPages from '$lib/components/ListPages.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
  export let data;
	// console.log('data', data)
</script>
<FormsSlideOvers title={'New Page'} >
	<FormPage {data} />
</FormsSlideOvers>
<PageHeadings title={data.site.data.info.name} />
<ListPages  pages={data.pages}/>
