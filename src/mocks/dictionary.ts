import { primaryKey, oneOf, manyOf } from '@mswjs/data';
import { Entity } from '@mswjs/data/lib/glossary';

import faker from 'faker';
import { Dictionary } from './models/dictionary';

const album: Entity<Dictionary, 'album'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.commerce.productName,
	user: oneOf<keyof Dictionary>('user'),
	photos: oneOf<keyof Dictionary>('photosPage'),
	__typename: () => 'Album',
};

const user: Entity<Dictionary, 'user'> = {
	id: primaryKey(faker.datatype.uuid),
	name: faker.name.firstName,
	username: faker.internet.userName,
	email: faker.internet.email,
	phone: faker.phone.phoneNumber,
	website: faker.internet.url,
	posts: manyOf<keyof Dictionary>('post'),
	albums: manyOf<keyof Dictionary>('album'),
	todos: manyOf<keyof Dictionary>('todo'),
	__typename: () => 'User',
};

const photosPage: Entity<Dictionary, 'photosPage'> = {
	id: primaryKey(faker.datatype.uuid),
	data: manyOf<keyof Dictionary>('photo'),
};

const photo: Entity<Dictionary, 'photo'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	url: faker.image.imageUrl,
	thumbnailUrl: faker.image.imageUrl,
	album: oneOf<keyof Dictionary>('album'),
	__typename: () => 'Photo',
};

const post: Entity<Dictionary, 'post'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	body: faker.lorem.paragraphs,
	user: oneOf<keyof Dictionary>('user'),
	comments: manyOf<keyof Dictionary>('comment'),
	__typename: () => 'Post',
};

const todo: Entity<Dictionary, 'todo'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	completed: faker.datatype.boolean,
	user: oneOf<keyof Dictionary>('user'),
	__typename: () => 'Todo',
};

const comment: Entity<Dictionary, 'comment'> = {
	id: primaryKey(faker.datatype.uuid),
	name: faker.name.firstName,
	email: faker.internet.email,
	body: faker.lorem.paragraph,
	post: oneOf<keyof Dictionary>('post'),
	__typename: () => 'Comment',
};

const dictionary: Dictionary = {
	album,
	comment,
	photo,
	photosPage,
	post,
	todo,
	user,
};

export default dictionary;
