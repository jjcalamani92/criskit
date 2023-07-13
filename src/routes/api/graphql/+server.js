// import { useGraphQlJit } from '@envelop/graphql-jit';
import { createYoga, createSchema } from 'graphql-yoga';
// import type { RequestEvent } from '@sveltejs/kit';
// import { renderGraphiQL } from '@graphql-yoga/render-graphiql';

import { addPage, deletePageById, deletePagesById, updatePage } from '$lib/db/pages/mutation';
import {
	existsPage,
	getPage,
	getPages,
	getPagesByParentId,
	getPagesBySiteId
} from '$lib/db/pages/query';
import { existsSite, getSite, getSites } from '$lib/db/sites/get';
import { addSite } from '$lib/db/sites/add';
import {
	getCategories,
	getCategoriesByParentId,
	getCategoriesBySiteId,
	getCategory,
	getCategoryInAll
} from '$lib/db/categories/query';
import { addCategory, deleteCategoriesById, updateCategory } from '$lib/db/categories/mutation';
import {
	existsProduct,
	getProduct,
	getProducts,
	getProductsByParentId,
	getProductsBySiteId
} from '$lib/db/products/query';
import {
	addProduct,
	deleteProductById,
	deleteProductsById,
	updateProduct
} from '$lib/db/products/mutation';
import { existsArticle, getArticle, getArticles, getArticlesByParentId, getArticlesBySiteId } from '$lib/db/articles/query';
import { addArticle, deleteArticleById, deleteArticlesById, updateArticle } from '$lib/db/articles/mutation';

const yogaApp = createYoga({
	logging: false,
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			scalar Date
			type Register {
				uid: String
				change: String
				updatedAt: Date
			}
			type UpdateDate {
				createdAt: Date
				lastUpdatedAt: Date
				register: [Register]
			}
			type Slug {
				name: String
				slug: String
			}
			type Params {
				path: [String]
				paths: [Slug]
			}
			# Site
			type Theme {
				lightAndDarkMode: Boolean
				light: String
				themes: [String]
			}
			type Info {
				name: String
				icon: String
				description: String
				website: String
			}
			type DataSite {
				type: String
				info: Info
				theme: Theme
			}
			type Site {
				_id: ID
				data: DataSite
				url: String
			}
			# Page
			type DataPage {
				name: String
				description: String
				thumbnailUrl: String
				bannerUrl: String
				type: String
				siteId: String
				params: Params
				updateDate: UpdateDate
			}
			type Page {
				_id: ID
				data: DataPage
				parentId: String
				slug: String
			}
			# Page
			type DataCategory {
				name: String
				description: String
				thumbnailUrl: String
				bannerUrl: String
				type: String
				siteId: String
				params: Params
				updateDate: UpdateDate
			}
			type Category {
				_id: ID
				data: DataCategory
				parentId: String
				slug: String
			}
			# Product
			type DataProduct {
				name: String
				description: String
				thumbnailUrl: String
				images: [String]
				siteId: String
				params: Params
				price: Float
				discountPrice: Float
				url: String
				updateDate: UpdateDate
			}
			type Product {
				_id: ID
				data: DataProduct
				parentId: String
				slug: String
			}
			# Product
			type DataArticle {
				name: String
				description: String
				thumbnailUrl: String
				content: String
				author: [Slug]
				category: [Slug]
				tags: [Slug]
				images: [String]
				siteId: String
				params: Params
				url: String
				updateDate: UpdateDate
			}
			type Article {
				_id: ID
				data: DataArticle
				parentId: String
				slug: String
			}
			# INPUT SITE
			input SiteInput {
				type: String!
				name: String!
				theme: String!
				lightAndDarkMode: Boolean!
				url: String
				uid: String
			}
			# INPUT PAGE
			input PageInput {
				id: String
				type: String!
				typePage: String
				name: String!
				parentId: String!
				siteId: String!
				description: String
				thumbnailUrl: String
				uid: String
			}
			# INPUT CATEGORY
			input CategoryInput {
				id: String
				i: String!
				type: String!
				typeCategory: String
				name: String!
				parentId: String
				siteId: String
				description: String
				thumbnailUrl: String
				uid: String
				paths: [String]
			}
			# INPUT PRODUCT
			input ProductInput {
				id: String
				type: String!
				name: String!
				parentId: String
				siteId: String
				description: String
				thumbnailUrl: String
				uid: String
				paths: [String]
			}
			input Content {
				h1: String
				h2: String
				h3: String
				h4: String
				h5: String
				p: String
				c1: String
				c2: String
			}
			input UpdateSiteComponent {
				type: String!
				id: String!
				uid: String!
				component: String!
				content: Content!
			}
			input Message {
				message: String
			}
			type Query {
				greetings: String
				hello: String
				getSites(type: String!): [Site]
				getSite(type: String!, id: String!): Site
				#Page
				getPagesByParentId(type: String!, parentId: String!): [Page]
				getPagesBySiteId(type: String!, siteId: String!): [Page]
				getPages(type: String!): [Page]
				getPage(type: String!, id: String!): Page
				#Product
				getProductsByParentId(type: String!, parentId: String!): [Product]
				getProductsBySiteId(type: String!, siteId: String!): [Product]
				getProducts(type: String!): [Product]
				getProduct(type: String!, id: String!): Product
				#Article
				getArticlesByParentId(type: String!, parentId: String!): [Article]
				getArticlesBySiteId(type: String!, siteId: String!): [Article]
				getArticles(type: String!): [Article]
				getArticle(type: String!, id: String!): Article
				#Categories
				getCategoriesByParentId(type: String!, parentId: String!, i: String!): [Category]
				getCategoriesBySiteId(type: String!, siteId: String!, i: String!): [Category]
				getCategories(type: String!, i: String!): [Category]
				getCategory(type: String!, id: String!, i: String!): Category
				getCategoryInAll(type: String!, id: String!): Category
			}
			type Mutation {
				updateSite(type: String!, id: String!, input: SiteInput!): String
				updateSiteComponent(input: UpdateSiteComponent!): String
				addSite(input: SiteInput!): String
				#Page
				addPage(input: PageInput!): String
				updatePage(input: PageInput!): String
				deletePagesById(type: String!, ids: [String]!): String
				deletePageById(type: String!, id: String!): String
				#Product
				addProduct(input: ProductInput!): String
				updateProduct(input: ProductInput!): String
				deleteProductsById(type: String!, ids: [String]!): String
				deleteProductById(type: String!, id: String!): String
				#Article
				addArticle(input: ArticleInput!): String
				updateArticle(input: ArticleInput!): String
				deleteArticlesById(type: String!, ids: [String]!): String
				deleteArticleById(type: String!, id: String!): String
				#Category
				addCategory(input: CategoryInput!): String
				updateCategory(input: CategoryInput!): String
				deleteCategoriesById(type: String!, ids: [String]!, i: String!): String
				deleteCategoriesByParentId(type: String!, i: String!, ids: [String]!): String
			}
			type Subscription {
				countdown(from: Int!): Int!
			}
		`,
		resolvers: {
			Query: {
				hello: () => 'SvelteKit - GraphQL Yoga',
				getSites: async (_, { type }) => await getSites(type),
				getSite: async (_, { type, id }) => await getSite(type, id),
				// Page
				getPages: async (_, { type }) => await getPages(type),
				getPagesByParentId: async (_, { type, parentId }) =>
					await getPagesByParentId(type, parentId),
				getPagesBySiteId: async (_, { type, siteId }) => await getPagesBySiteId(type, siteId),
				getPage: async (_, { type, id }) => await getPage(type, id),
				// Product
				getProducts: async (_, { type }) => await getProducts(type),
				getProductsByParentId: async (_, { type, parentId }) =>
					await getProductsByParentId(type, parentId),
				getProductsBySiteId: async (_, { type, siteId }) => await getProductsBySiteId(type, siteId),
				getProduct: async (_, { type, id }) => await getProduct(type, id),
				// Category
				getCategories: async (_, { type, i }) => await getCategories(type, i),
				getCategoriesByParentId: async (_, { type, parentId, i }) =>
					await getCategoriesByParentId(type, parentId, i),
				getCategoriesBySiteId: async (_, { type, siteId, i }) =>
					await getCategoriesBySiteId(type, siteId, i),
				getCategory: async (_, { type, id, i }) => await getCategory(type, id, i),
				getCategoryInAll: async (_, { type, id }) => await getCategoryInAll(type, id),
				// Article
				getArticles: async (_, { type }) => await getArticles(type),
				getArticlesByParentId: async (_, { type, parentId }) =>
					await getArticlesByParentId(type, parentId),
				getArticlesBySiteId: async (_, { type, siteId }) => await getArticlesBySiteId(type, siteId),
				getArticle: async (_, { type, id }) => await getArticle(type, id),
			},
			Mutation: {
				addSite: async (parent, { input }) => {
					await existsSite(input.type, input.url);
					return await addSite(input);
				},
				// Page
				addPage: async (parent, { input }) => {
					await existsPage(input.type, input.name, input.parentId);
					return await addPage(input);
				},
				updatePage: async (parent, { input }) => {
					return await updatePage(input);
				},
				// Product
				addProduct: async (parent, { input }) => {
					await existsProduct(input.type, input.name, input.parentId);
					return await addProduct(input);
				},
				updateProduct: async (parent, { input }) => {
					return await updateProduct(input);
				},
				deleteProductsById: async (parent, { type, ids }) => {
					return await deleteProductsById(type, ids);
				},
				deleteProductById: async (parent, { type, id }) => {
					return await deleteProductById(type, id);
				},
				// Article
				addArticle: async (parent, { input }) => {
					await existsArticle(input.type, input.name, input.parentId);
					return await addArticle(input);
				},
				updateArticle: async (parent, { input }) => {
					return await updateArticle(input);
				},
				deleteArticlesById: async (parent, { type, ids }) => {
					return await deleteArticlesById(type, ids);
				},
				deleteArticleById: async (parent, { type, id }) => {
					return await deleteArticleById(type, id);
				},
				// Category
				addCategory: async (parent, { input }) => {
					return await addCategory(input);
				},
				updateCategory: async (parent, { input }) => {
					return await updateCategory(input);
				},
				deleteCategoriesById: async (parent, { type, ids, i }) => {
					return await deleteCategoriesById(type, ids, i);
				},

				deletePagesById: async (parent, { type, ids }) => {
					return await deletePagesById(type, ids);
				},
				deletePageById: async (parent, { type, id }) => {
					return await deletePageById(type, id);
				},
				
			},
			Subscription: {
				countdown: {
					// This will return the value on every 1 sec until it reaches 0
					subscribe: async function* (_, { from }) {
						for (let i = from; i >= 0; i--) {
							await new Promise((resolve) => setTimeout(resolve, 1000));
							yield { countdown: i };
						}
					}
				}
			}
		}
	}),
	plugins: [
		// useGraphQlJit()
		// other plugins: https://www.envelop.dev/plugins
	],
	graphqlEndpoint: '/api/graphql',
	// renderGraphiQL,
	graphiql: {
		defaultQuery: `query Hello {
	hello
}`
	},
	// eslint-disable-next-line no-undef
	fetchAPI: globalThis
});

export { yogaApp as GET, yogaApp as POST };
