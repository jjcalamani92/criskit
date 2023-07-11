<script>
	import { form } from "../stores";
	import clickOutside from "../utils/clickOutside";

	
</script>
{#if $form}
  <div class="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
          <!-- overflow-y-scroll -->
          <div class="pointer-events-auto w-screen max-w-md" use:clickOutside on:click_outside={form.close}>
            <div class="flex h-full flex-col   bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">New Pages</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button on:click={form.close} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="">
                  <div class="flow-root">
                    <slot />
                    
                  </div>
                </div>
              </div>
              
              <!-- <div class="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-100">
                <div class=" flex items-center justify-end gap-x-6">
                  <button type="button" class=" text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                  <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
                
                
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
