<script>
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import FormsSlideOversUpdate from '$lib/components/FormsSlideOversUpdate.svelte';
	import Headings from '$lib/components/Headings.svelte';
	import ListArticles from '$lib/components/ListArticles.svelte';
	import FormArticle from '$lib/components/forms/FormArticle.svelte';
	import FormCategoryEdit from '$lib/components/forms/FormCategoryEdit.svelte';

    export let data;
</script>

<FormsSlideOversAdd title={'New Article'} >
	<FormArticle {data} />
</FormsSlideOversAdd>
<FormsSlideOversUpdate title={'Edit Category'} >
	<FormCategoryEdit {data} />
</FormsSlideOversUpdate>
<Headings title={data.category.data.name} />
<ListArticles articles={data.articles} />
<!-- <h1>Products</h1> -->