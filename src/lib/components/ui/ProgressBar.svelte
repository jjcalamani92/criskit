<script>
// @ts-nocheck
import { page, navigating } from '$app/stores';

  	import { onDestroy } from 'svelte';

let elapsed = 0;
let duration = 2000;

let last_time = window.performance.now();
let frame;

(function update() {
  frame = requestAnimationFrame(update);

  const time = window.performance.now();
  elapsed += Math.min(time - last_time, duration - elapsed);

  last_time = time;
})();

onDestroy(() => {
  cancelAnimationFrame(frame);
});
</script>
<style>
.progress{
 
}
</style>

{#if $navigating}
    <progress class="w-full h-2 p-0 m-0 progress" value={elapsed / duration} />
	{/if}