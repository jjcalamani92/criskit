// @ts-nocheck
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

async function authorization({ event, resolve }) {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith("/dashboard")) {
    const session = await event.locals.getSession();
    // console.log('session', session)
    if (!session) {
      throw redirect(303, "/auth/signin");
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
}

// export const handle = SvelteKitAuth({
// });
export const handle = sequence(
  SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),],
  }),
  authorization
);