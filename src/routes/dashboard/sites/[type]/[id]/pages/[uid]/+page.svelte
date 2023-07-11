<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import ListCategories from '$lib/components/ListCategories.svelte';
	import ListPages from '$lib/components/ListPages.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormCategory from '$lib/components/forms/FormCategory.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
  export let data;
		
</script>
<FormsSlideOvers title={'New Category'} >
	<FormCategory {data} />
</FormsSlideOvers>
<PageHeadings />
<ListCategories />
