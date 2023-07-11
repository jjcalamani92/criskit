<script>
  import { superForm } from 'sveltekit-superforms/client';
	import  SuperDebug  from 'sveltekit-superforms/client/SuperDebug.svelte';

  export let data;

  const { form } = superForm(data.form)
</script>
<form method="POST" action="?/create">
  <div class="space-y-6">
    <div class="border-b border-gray-900/10 pb-12">
      

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
        
        <div class="col-span-full">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input type="text" name="name" id="name" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.name}>
          </div>
        </div>
        <div class="col-span-full">
          <label for="theme" class="block text-sm font-medium leading-6 text-gray-900">Theme</label>
          <div class="mt-2">
            <input type="text" name="theme" id="theme" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.theme}>
          </div>
        </div>
        
        <div class="col-span-full">
          <label for="theme" class="block text-sm font-medium leading-6 text-gray-900">Domain</label>
          <div class="mt-2">
            <input type="text" name="theme" id="theme" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={$form.url}>
          </div>
        </div>
        

        

        
      </div>
    </div>
    <div class="col-span-full">
      
      <fieldset>
        <legend class="text-sm font-semibold leading-6 text-gray-900">Theme Light Mode</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
        <div class="mt-6 space-y-6">
          <div class="flex items-center gap-x-3">
            <input id="category" name="type" type="radio" bind:value={$form.lightAndDarkMode} class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" >
            <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Categories</label>
          </div>
          <div class="flex items-center gap-x-3">
            <input id="product" name="type" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="product">
            <label for="product" class="block text-sm font-medium leading-6 text-gray-900">Products</label>
          </div>
          
        </div>
      </fieldset>
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

