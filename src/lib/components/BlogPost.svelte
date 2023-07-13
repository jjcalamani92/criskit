<script>
// @ts-nocheck
	
	const source = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |`
  export let article 
</script>
<article
	class="px-4 py-24 mx-auto max-w-7xl"
	itemid={'#'}
	itemscope
	itemtype="http://schema.org/BlogPosting"
>
	<div class="w-full mx-auto mb-12 text-center md:w-2/3">
		<p class="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">Development</p>
		<h1
			class="mb-3 text-4xl font-bold text-gray-900 md:leading-tight md:text-5xl"
			itemprop="headline"
			title="Rise of Tailwind - A Utility First CSS Framework"
		>
			{article.data.name}
		</h1>
		<p class="text-gray-700">
			Written by
			<span class="byline author vcard" itemprop="author" itemtype="http://schema.org/Person">
				<a
					href={'#'}
					target="_blank"
					itemprop="url"
					rel="author noopener noreferrer"
					class="text-primary hover:text-primary-dark"><span itemprop="name">Praveen Juge</span></a
				>
			</span>
			on
			<time itemprop="datePublished dateModified" datetime="2010-08-07 11:11:03-0400"
				>Jan 02 2021</time
			>
		</p>
	</div>

	<div class="mx-auto prose">
    <!-- <svelte:component this={" # Hola"} /> -->
		<slot />
		
	</div>
</article>
