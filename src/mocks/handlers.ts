import { graphql, RequestHandler } from 'msw';
import { Album } from '../models/schema';
import { CreateAlbum } from '../hooks/albums/models/createAlbum';

/**
 * Here we define what API request returns in our mock.
 *
 * TODO: Find out if co-locating these to their corresponding page is beneficial.
 * TODO: If needed, find a way to co-locate mock data to it's corresponding Page.
 * TODO: Add correct type inference.
*/

export const MOCK_ALBUMS: Album[] = [
	{
		id: '0', title: 'title 0', user: { id: '0', username: 'username 0' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
	{
		id: '1', title: 'title 1', user: { id: '1', username: 'username 1' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
	{
		id: '2', title: 'title 2', user: { id: '2', username: 'username 2' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
	{
		id: '3', title: 'title 3', user: { id: '3', username: 'username 3' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
	{
		id: '4', title: 'title 4', user: { id: '4', username: 'username 4' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
	{
		id: '5', title: 'title 5', user: { id: '5', username: 'username 5' }, photos: { data: [{ id: '0', title: 'title 0', url: '/photo/0' }, { id: '1', title: 'title 1', url: '/photo/1' }, { id: '2', title: 'title 2', url: '/photo/2' }, { id: '3', title: 'title 3', url: '/photo/3' }, { id: '4', title: 'title 4', url: '/photo/4' }] },
	},
];

type MockCreateAlbumResponse = (
	props: {
		title: string,
		userId: string,
	}
) => CreateAlbum;

export const MOCK_CREATE_ALBUM_RESPONSE: MockCreateAlbumResponse = ({ title, userId }) => ({
	createAlbum: {
		id: '0',
		title,
		user: {
			id: userId,
			username: `username-${userId}`,
		},
	},
});

const handlers: RequestHandler[] = [
	graphql.query('getAlbums', (req, res, ctx) => res(ctx.data({
		albums: {
			data: MOCK_ALBUMS,
		},
	}))),

	graphql.query('getAlbumById', (req, res, ctx) => res(ctx.data({
		album: MOCK_ALBUMS[req.body?.variables.id],
	}))),

	graphql.mutation('createAlbum', (req, res, ctx) => res(ctx.data(
		MOCK_CREATE_ALBUM_RESPONSE({
			title: req.body?.variables.title,
			userId: req.body?.variables.userId,
		}),
	))),

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
