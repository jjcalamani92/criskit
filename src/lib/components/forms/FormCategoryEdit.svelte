<script >
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import  SuperDebug  from 'sveltekit-superforms/client/SuperDebug.svelte';


   export let data;
  //  console.log('dataaa', data)
  // console.log(data?.data.params.paths)
  // @ts-ignore
  const { form } = superForm(data.formEditCategory, {
    id: "12345s"
  })
  // console.log('data.page', data.page)
  const paths = data.page ? data?.page.data.params.paths.map((/** @type {{ name: any; }} */ data) => data.name).join('/') : data?.category.data.params.paths.map((/** @type {{ name: any; }} */ data) => data.name).join('/')
  const typePage = [
    {
    name: "Categories",
    slug: "category",
    }, 
    {
    name: "Products",
    slug: "product",
    }, 
    {
    name: "Articles",
    slug: "article",
    }, 
  ]
</script>
<!-- <SuperDebug data={$form} /> -->
<form method="POST" action="?/create">
  <div class="space-y-6">
    <div class="border-b border-gray-900/10 pb-12">
      <!-- <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2> -->
      <!-- <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p> -->

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
        
        <div class="col-span-full">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input type="text" name="name" id="name" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.name}>
          </div>
        </div>
        
        <div class="col-span-full">
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <textarea id="description" name="description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.description}></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
        </div>

        

        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Thumbnail Url</label>
          <div class="mt-2">
            <input type="text" name="thumbnailUrl" id="thumbnailUrl"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.thumbnailUrl}>
          </div>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only">
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-full">
      
      <fieldset>
        <legend class="text-sm font-semibold leading-6 text-gray-900">Type</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
        <div class="mt-6 space-y-6">
          {#each typePage as { slug, name }, i}
            
            <div class="flex items-center gap-x-3">
              <input id="category" name="typeCategory" type="radio" bind:group={$form.typeCategory} value={slug} class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" >
              <label for="category" class="block text-sm font-medium leading-6 text-gray-900">{name}</label>
            </div>
          {/each}
          
        </div>
      </fieldset>
    </div>
    <div class="col-span-full">
      <label for="paths" class="block text-sm font-medium leading-6 text-gray-900">Paths</label>
      <div class="mt-2">
        <input type="text" name="paths" id="paths" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value="/{paths}" >
      </div>
    </div>
    
  </div>

  <!-- <div class="border-t border-gray-200 bg-gray-100">
    <div class=" flex items-center justify-end gap-x-6">
      <button type="button" class=" text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
    
    
  </div> -->

  <div class="mt-6 flex items-center justify-end gap-x-6 ">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit"  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
</form>
