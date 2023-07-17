<script>
// @ts-nocheck

	import BlogPost from "$lib/components/BlogPost.svelte";
	import Headings from "$lib/components/Headings.svelte";
  import { Editor, Viewer } from 'bytemd'
  import gfm from '@bytemd/plugin-gfm'
  import highlight from '@bytemd/plugin-highlight'
  import frontmatter from '@bytemd/plugin-frontmatter'
  import math from '@bytemd/plugin-math'

	import { onMount } from "svelte";
  import 'bytemd/dist/index.css';
  import 'highlight.js/styles/monokai.css'
	import EditorArticle from "$lib/components/EditorArticle.svelte";
  export let data;
  /**
	 * @type {any}
	 */
  let value = data.article.data.traslate.es.content || ''
  // let value = data.article.data.content || ''
  const plugins = [
    gfm(),
    highlight(),
    frontmatter(),
    math()
    // Add more plugins here
  ]

  // @ts-ignore
  function handleChange(event) {
    value = event.detail.value;
  }

  
  onMount(() => {
    // const editorContainer = document.getElementById('editor');

    const editor = new Editor({
      target: editorContainer,
      props: {
        value,
        plugins,
        
      },
      // Opciones de configuración adicionales para el editor
      //value = e.detail.value
    });

    // Acciones adicionales o configuraciones específicas del editor

    // Si también necesitas el visor, puedes crear una instancia de Viewer
    const viewerContainer = document.getElementById('viewer');
    const viewer = new Viewer({
      target: viewerContainer,
      // Opciones de configuración adicionales para el visor
    });

    // Acciones adicionales o configuraciones específicas del visor
  });
  // console.log('data', data)
</script>

<Headings title={data.article.data.name} />
<!-- <BlogPost  article={data.article}>
  <Viewer value={data.article.data.content} {plugins} />
</BlogPost> -->


<!-- <template>
  <Editor {value} {plugins} on:change={handleChange} />
</template> -->
<!-- <div id="editor"></div> -->
<EditorArticle>
  <div class="container prose">
    <Editor bind:value {plugins} on:change={handleChange}  />
  </div>
</EditorArticle>
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  :global(.bytemd) {
    height: calc(100vh - 100px);
  }
</style>