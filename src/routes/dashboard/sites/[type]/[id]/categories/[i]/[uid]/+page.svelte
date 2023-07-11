<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListCategories from '$lib/components/ListCategories.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormCategory from '$lib/components/forms/FormCategory.svelte';
  export let data;
		
</script>
<FormsSlideOvers title={'New Category'} >
	<FormCategory {data} />
</FormsSlideOvers>
<PageHeadings title={data.page.data.name} />
<ListCategories categories={data.categories} />



