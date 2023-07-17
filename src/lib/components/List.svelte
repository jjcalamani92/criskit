
<script>
	import { page } from '$app/stores';
	// console.log('page', $page)
	
	export let types = [
		{
			name: 'Wear',
			slug: 'wear',
      thumbnailUrl: 'https://images.asos-media.com/products/vestido-corto-negro-con-cuello-de-nadadora-y-estampado-grafico-cosmic-de-canale-de-asyou/202996837-1-black?$n_640w$&wid=513&fit=constrain'
		},
		{
			name: 'Furniture',
			slug: 'furniture',
      thumbnailUrl: 'https://static4.depositphotos.com/1000507/371/i/600/depositphotos_3710631-stock-photo-classic-furniture-in-a-modern.jpg'
		},
		{
			name: 'Portfolio',
			slug: 'portfolio',
      thumbnailUrl: 'https://blog.depositphotos.com/wp-content/uploads/2019/04/Depositphotos_209179682_m-2015kk.jpg.webp'
		},
		{
			name: 'Docs',
			slug: 'docs',
      thumbnailUrl: 'https://st3.depositphotos.com/7865540/13899/i/450/depositphotos_138995344-stock-photo-concept-on-laptop-screen.jpg'
		},
	];
	// console.log('sites', sites)
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<!-- <h2 class="sr-only">Products</h2> -->

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{#each types as { name, slug, thumbnailUrl }, i}
				<a href="{$page.url.pathname}/{slug}" class="group">
					<div
						class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
					>
						<img
							src={thumbnailUrl ||
								'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'}
							alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
							class="h-full w-full object-cover object-center group-hover:opacity-75"
						/>
					</div>
					<h3 class="mt-4 text-sm text-gray-700">{name}</h3>
					<!-- <p class="mt-1 text-lg font-medium text-gray-900">{url}</p> -->
				</a>
			{/each}
		</div>
	</div>
</div>
