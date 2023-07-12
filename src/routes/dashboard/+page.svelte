<script >
   import { signIn, signOut } from "@auth/sveltekit/client"
   import { page } from "$app/stores"
    export let data;
    
</script>

{#if $page.data.session}
<h1>Protected page</h1>
<p>
  This is a protected content. You can access this content because you are
  signed in.
</p>
<p>Session expiry: {$page.data.session?.expires}</p>
{:else}
<h1>Access Denied</h1>
<p>
  <a href="/auth/signin">
    You must be signed in to view this page
  </a>
</p>
{/if}

<h1>SvelteKit Auth Example</h1>
<p>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <button  on:click={() => signOut()} class="button bg-red-300">Sign out</button>
  {:else}
    <span class="notSignedInText ">You are not signed in</span>
    <button class=" bg-red-300" on:click={() => signIn("google")}>Sign In with Google</button>
  {/if}
</p>