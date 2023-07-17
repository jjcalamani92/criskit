<script>
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import FormsSlideOversUpdate from '$lib/components/FormsSlideOversUpdate.svelte';
	import Headings from '$lib/components/Headings.svelte';
	import ListCategories from '$lib/components/ListCategories.svelte';
	import FormCategoryAdd from '$lib/components/forms/FormCategoryAdd.svelte';
	import FormCategoryEdit from '$lib/components/forms/FormCategoryEdit.svelte';
  export let data;
		
</script>
<!-- <FormsSlideOvers title={'New Category'} >
	<FormCategory {data} />
</FormsSlideOvers>
<PageHeadings title={data.category.data.name} /> -->
<FormsSlideOversAdd title={'New Category'} >
	<FormCategoryAdd {data} />
</FormsSlideOversAdd>
<FormsSlideOversUpdate title={'Edit Category'} >
	<FormCategoryEdit {data} />
</FormsSlideOversUpdate>
<Headings title={data.category.data.name} />
<ListCategories categories={data.categories} />



