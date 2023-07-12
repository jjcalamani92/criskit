// @ts-nocheck
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { env } from '$env/dynamic/private';
import { sequence } from "@sveltejs/kit/hooks";
import { redirect } from "@sveltejs/kit";

async function authorization({ event, resolve }) {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith('/dashboard')) {
    const session = await event.locals.getSession();
    // console.log('session1', session.user.email)
    if (!session?.user) {
      throw redirect(303, "/auth/signin");
    } 
    if (session) {
        if (session?.user.email !== 'gorditomaloso@gmail.com') {
          throw redirect(303, "/");
          
        }
      } 
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
}


export const handle = sequence(
  SvelteKitAuth({
    providers: [Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),],
  }),
  authorization
);