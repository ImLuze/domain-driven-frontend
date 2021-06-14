import { Database } from '../models/database';

const populatePhotoCollection = (db: Database): void => {
	db.photo.create({
		title: 'Image 1',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 2',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 3',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 4',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 5',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 6',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 7',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 8',
		url: 'https://picsum.photos/200/300',
	});
	db.photo.create({
		title: 'Image 9',
		url: 'https://picsum.photos/200/300',
	});
};

export default populatePhotoCollection;
