import { Album as AlbumDTO } from '../../models/schema';

/**
 * This is our mock database. Right now these fake database collections need to be written manually.
 * In the near future I'll look into finding a good way to automate this process.
 */

const MOCK_ALBUMS: AlbumDTO[] = [
	{
		id: '0',
		title: 'title 0',
		user: { id: '0', username: 'username 0' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
	{
		id: '1',
		title: 'title 1',
		user: { id: '1', username: 'username 1' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
	{
		id: '2',
		title: 'title 2',
		user: { id: '2', username: 'username 2' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
	{
		id: '3',
		title: 'title 3',
		user: { id: '3', username: 'username 3' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
	{
		id: '4',
		title: 'title 4',
		user: { id: '4', username: 'username 4' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
	{
		id: '5',
		title: 'title 5',
		user: { id: '5', username: 'username 5' },
		photos: {
			data: [
				{ id: '0', title: 'title 0', url: '/photo/0' },
				{ id: '1', title: 'title 1', url: '/photo/1' },
				{ id: '2', title: 'title 2', url: '/photo/2' },
				{ id: '3', title: 'title 3', url: '/photo/3' },
				{ id: '4', title: 'title 4', url: '/photo/4' },
			],
		},
	},
];

export default MOCK_ALBUMS;
