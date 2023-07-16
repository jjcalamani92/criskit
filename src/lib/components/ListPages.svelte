
<script>
  import { page } from '$app/stores';
	import { longpress } from '$lib/utils/longpress';
  // console.log('page', $page)
  // const pages = $page.data.pages
     	/**
	 * @type {any}
	 */
	export let pages = [];
  
  /**
	 * @type {string[]}
	 */
  let ids = ['1']
  /**
   * @param {string} e
   */
  function click(e) {
    ids.push(e)
    console.log('Hola', e)
    console.log('ids', ids)
}
</script>

<div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="sr-only">Products</h2>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {#each pages as { _id, data: { name, thumbnailUrl, type } }, i}
      <!-- <a href="{$page.url.pathname}/pages/{_id}" class="group"> -->
        <div  class="group relative">
          <input type="checkbox" class={`h-5 w-5 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 absolute  top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition ease-in-out delay-150 ${ids.length !==0 && 'opacity-100'}`} on:click={() => click(_id)}/>
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img src={thumbnailUrl || "https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg"} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <a
					href={type === 'category'
						? `${$page.url.pathname}/pages/${_id}`
						: type === 'product'
						? `/dashboard/sites/${$page.params.type}/${$page.params.id}/products/${_id}`
						: `/dashboard/sites/${$page.params.type}/${$page.params.id}/articles/${_id}`}
					class="mt-4 text-sm text-gray-700"
				>
        {name}
      </a>
      <!-- <a href="{$page.url.pathname}/pages/{_id}" class="mt-4 text-sm text-gray-700"></a> -->
        <p class="mt-1 text-lg font-medium text-gray-900">{type}</p>
      </div>
      {/each}
      

      
    </div>
  </div>
</div>
