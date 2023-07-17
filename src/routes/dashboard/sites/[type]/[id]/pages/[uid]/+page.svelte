<script>
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import FormsSlideOversUpdate from '$lib/components/FormsSlideOversUpdate.svelte';
	import Headings from '$lib/components/Headings.svelte';
	import ListCategories from '$lib/components/ListCategories.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormCategoryAdd from '$lib/components/forms/FormCategoryAdd.svelte';
	// import FormCategory from '$lib/components/forms/FormCategoryAdd.svelte';
	import FormPage from '$lib/components/forms/FormPage.svelte';
	
  export let data;
		console.log('data', data)
</script>
<!-- <FormsSlideOvers title={'New Category'} >
	<FormCategory data={{form: data.form, category: data.page} } />
</FormsSlideOvers> -->
<FormsSlideOversAdd title={'New Category'} >
	<FormCategoryAdd {data} />
</FormsSlideOversAdd>
<FormsSlideOversUpdate title={'Edit Page'} >
	<FormPage {data} />
</FormsSlideOversUpdate>

<!-- <PageHeadings title={data.page.data.name} /> -->
<Headings title={data.page.data.name} />
<ListCategories categories={data.categories}/>



