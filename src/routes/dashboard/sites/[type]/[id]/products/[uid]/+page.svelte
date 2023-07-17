<script>
	import FormsSlideOversAdd from '$lib/components/FormsSlideOversAdd.svelte';
	import FormsSlideOversUpdate from '$lib/components/FormsSlideOversUpdate.svelte';
	import Headings from '$lib/components/Headings.svelte';
	import ListProducts from '$lib/components/ListProducts.svelte';
	import FormCategoryEdit from '$lib/components/forms/FormCategoryEdit.svelte';
	import FormProduct from '$lib/components/forms/FormProduct.svelte';

    
    export let data;
    // console.log('data', data)
</script>

<FormsSlideOversAdd title={'New Product'} >
	<FormProduct {data} />
</FormsSlideOversAdd>
<FormsSlideOversUpdate title={'Edit Category'} >
	<FormCategoryEdit {data} />
</FormsSlideOversUpdate>
<Headings title={data.category.data.name} />
<ListProducts products={data.products} />
<!-- <h1>Products</h1> -->