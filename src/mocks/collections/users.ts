import { Database } from '../models/database';

const populateUserCollection = (db: Database): void => {
	db.user.create({
		name: 'Johnny Depp',
		username: 'Johnson & Deppson',
	});
	db.user.create({
		name: 'Danny Phantom',
		username: 'Ghostrider',
	});
};

export default populateUserCollection;
