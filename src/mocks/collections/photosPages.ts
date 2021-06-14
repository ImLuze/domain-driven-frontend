import { Collections, Database } from '../models/database';

const populatePhotosPageCollection = (db: Database, collections: Collections<'photo'>): void => {
	db.photosPage.create({
		data: [
			collections.photo[0],
			collections.photo[1],
			collections.photo[2],
			collections.photo[3],
			collections.photo[4],
		],
	});
	db.photosPage.create({
		data: [
			collections.photo[5],
			collections.photo[6],
			collections.photo[7],
		],
	});
	db.photosPage.create({
		data: [
			collections.photo[8],
		],
	});
};

export default populatePhotosPageCollection;
