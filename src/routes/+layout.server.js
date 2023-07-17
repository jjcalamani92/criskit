import { getSiteByIdComponents } from '$lib/fetch/sites';

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const session = await event.locals.getSession()
    const site = await getSiteByIdComponents('portfolio', '64b554ab79d6050fadcaf6ce')
    return {
        session, components: site
    };
}