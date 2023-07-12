<script>
	import FormsSlideOvers from '$lib/components/FormsSlideOvers.svelte';
	import PageHeadings from '$lib/components/PageHeadings.svelte';
	import FormCategory from '$lib/components/forms/FormCategory.svelte';
	import FormProduct from '$lib/components/forms/FormProduct.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    // console.log('data', data)
</script>

<FormsSlideOvers title={'New Product'} >
	<FormProduct {data} />
</FormsSlideOvers>
<PageHeadings title={data.category.data.name} />

<h1>Products</h1>