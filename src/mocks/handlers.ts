import { graphql, RequestHandler } from 'msw';
import MOCK_ALBUMS from './data/albums';

/**
 * Here we define what API requests returns in our mock. These same API request mocks can be used in
 * integration tests or in the browser.
*/

const handlers: RequestHandler[] = [
	graphql.query('getAlbums', (req, res, ctx) => res(ctx.data({
		albums: {
			data: MOCK_ALBUMS,
		},
	}))),

	graphql.query('getAlbumById', (req, res, ctx) => res(ctx.data({
		album: MOCK_ALBUMS[req.body?.variables.id],
	}))),

	graphql.mutation('createAlbum', (req, res, ctx) => res(ctx.data({
		createAlbum: MOCK_ALBUMS[0],
	}))),

	graphql.mutation('updateAlbum', (req, res, ctx) => res(ctx.data({
		updateAlbum: {
			id: req.body?.variables.id,
			title: req.body?.variables.title,
			user: {
				id: req.body?.variables.userId,
				username: `username-${req.body?.variables.userId}`,
			},
		},
	}))),

	graphql.mutation('deleteAlbum', (req, res, ctx) => res(ctx.data({
		deleteAlbum: true,
	}))),
];

export default handlers;
