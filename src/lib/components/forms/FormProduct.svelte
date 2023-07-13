<script >
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import  SuperDebug  from 'sveltekit-superforms/client/SuperDebug.svelte';


   export let data;

  const { form } = superForm(data.formProduct)
  const paths = data?.category.data.params.paths.map((/** @type {{ name: any; }} */ data) => data.name).join('/')
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
          
        </div>

        <div class="col-span-full">
          <label for="paths" class="block text-sm font-medium leading-6 text-gray-900">Paths</label>
          <div class="mt-2">
            <input type="text" name="paths" id="paths" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value="/{paths}" >
          </div>
        </div>
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
