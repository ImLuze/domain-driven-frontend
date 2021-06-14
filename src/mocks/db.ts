import { factory, drop } from '@mswjs/data';
import faker from 'faker';
import dictionary from './dictionary';
import { Dictionary } from './models/dictionary';
import populateAlbumCollection from './collections/albums';
import populateUserCollection from './collections/users';
import populatePhotosPageCollection from './collections/photosPages';
import populatePhotoCollection from './collections/photos';

const db = factory<Dictionary>(dictionary);

export const rollbackDatabase = () => {
	drop(db);

	faker.seed(123);

	populateUserCollection(db);
	populatePhotoCollection(db);
	populatePhotosPageCollection(db, { photo: db.photo.getAll() });
	populateAlbumCollection(db, { user: db.user.getAll(), photosPage: db.photosPage.getAll() });
};

rollbackDatabase();

export default db;
