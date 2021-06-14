import { graphql, RequestHandler } from 'msw';
import { CreateAlbum, CreateAlbumVariables } from '../hooks/albums/models/createAlbum';
import { DeleteAlbum, DeleteAlbumVariables } from '../hooks/albums/models/deleteAlbum';
import { UpdateAlbum, UpdateAlbumVariables } from '../hooks/albums/models/updateAlbum';
import { GetAlbumById, GetAlbumByIdVariables } from '../pages/albumDetailPage/models/getAlbumById';
import { GetAlbums, GetAlbumsVariables } from '../pages/albumsPage/models/getAlbums';
import db from './db';

/**
 * Here we define what API requests returns in our mock. These same API request mocks can be used in
 * integration tests or in the browser.
*/

const handlers: RequestHandler[] = [
	graphql.query<GetAlbums, GetAlbumsVariables>('getAlbums', (req, res, ctx) => {
		const albums = db.album.getAll();

		return res(ctx.data({
			albums: {
				data: albums,
			},
		}));
	}),

	graphql.query<GetAlbumById, GetAlbumByIdVariables>('getAlbumById', (req, res, ctx) => {
		const { id } = req.body?.variables;
		const album = db.album.findFirst({
			where: {
				id: {
					equals: id,
				},
			},
		});

		return res(ctx.data({
			album,
		}));
	}),

	graphql.mutation<CreateAlbum, CreateAlbumVariables>('createAlbum', (req, res, ctx) => {
		const { input } = req.body?.variables;
		const [photosPage] = db.photosPage.getAll();
		const [user] = db.user.getAll();
		const album = db.album.create({ title: input.title, photos: photosPage, user });

		return res(ctx.data({
			createAlbum: album,
		}));
	}),

	graphql.mutation<UpdateAlbum, UpdateAlbumVariables>('updateAlbum', (req, res, ctx) => {
		const { input, id } = req.body?.variables;
		const album = db.album.update({
			data: {
				...(input.title && { title: input.title }),
				...(input.photos && { photos: input.photos }),
			},
			where: {
				id: {
					equals: id,
				},
			},
		});

		return res(ctx.data({
			updateAlbum: album,
		}));
	}),

	graphql.mutation<DeleteAlbum, DeleteAlbumVariables>('deleteAlbum', (req, res, ctx) => {
		const { id } = req.body?.variables;
		const album = db.album.delete({
			where: {
				id: {
					equals: id,
				},
			},
		});

		return res(ctx.data({
			deleteAlbum: !!album,
		}));
	}),
];

export default handlers;
