// @ts-nocheck

import slugify from "slugify";
import clientPromise0 from "../mongodb";

// interface Body {
//   name: string,
//   theme: string,
//   lightAndDarkMode: boolean
//   uid: string,
//   url: string,
//   type: string,
// }

const nameCollection = 'sites'

/**
 * @param {{ type: string; name: string; theme: string; lightAndDarkMode: boolean; uid: string; url: string; }} body
 */
export async function addSite (body) {
  const { type, name, theme, lightAndDarkMode, uid, url } = body
  
  const dark = theme.charAt(0).toUpperCase() + theme.slice(1);
  const client = await clientPromise0;
  const db = client.db(type);
  await db.collection(nameCollection)
  .insertOne({
    url: url ? url :`${slugify(name, {lower: true})}.vercel.app`,
    data: {
      theme: {
        lightAndDarkMode,
        light: theme,
        themes: lightAndDarkMode ? [theme, `dark${dark}`] : [theme],
      },
      info: {
        name,
        icon: '/favicon.png',
      },
      components: {
        header: '0',
        headingArticles: '0',
        gridArticles: '0',
        cardArticles: '0',
        headingProducts: '0',
        gridProducts: '0',
        cardProducts: '0',
        headingCategories: '0',
        gridCategories: '0',
        cardCategories: '0',
        contact: '0',
        faqs: '0',
        footer: '0'
      },
      type: type,
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: "create site",
            updatedAt: new Date(),
          },
        ],
      },
    },
  })
  return "¡Sitio Creado!"
  
}