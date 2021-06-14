import { Collections, Database } from '../models/database';

const populateAlbumCollection = (db: Database, collections: Collections<'user' | 'photosPage'>): void => {
	db.album.create({
		title: 'test title',
		user: collections.user[0],
		photos: collections.photosPage[0],
	});
	db.album.create({
		title: 'Another test album by the same user',
		user: collections.user[0],
		photos: collections.photosPage[1],
	});
	db.album.create({
		title: 'A second user',
		user: collections.user[1],
		photos: collections.photosPage[2],
	});
};

export default populateAlbumCollection;
