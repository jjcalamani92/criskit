<script>
	import BlogPost from "$lib/components/BlogPost.svelte";
	import Headings from "$lib/components/Headings.svelte";
  export let data;
</script>
<Headings title={data.article.data.name} />
<BlogPost  article={data.article}>
  Hola
</BlogPost>

<!-- <Editor {value} {plugins} on:change={handleChange} /> -->