<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<script>
  import { page } from '$app/stores';
  
  // const pages = $page.data.categories
    	/**
	 * @type {any}
	 */
	export let categories = [];
  // console.log('categories', categories)
  // console.log('page', $page.data.pages)
</script>
<div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="sr-only">Products</h2>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {#each categories as { _id, data: { name, thumbnailUrl, type } }, i}
      <a href="/dashboard/sites/{$page.params.type}/{$page.params.id}/categories/{+$page.params.i+1}/{_id}" class="group">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img src={thumbnailUrl || "https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg"} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{name}</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">{type}</p>
      </a>
      {/each}
      

      
    </div>
  </div>
</div>
