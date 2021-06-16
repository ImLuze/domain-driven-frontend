import { primaryKey, oneOf, manyOf } from '@mswjs/data';
import faker from 'faker';
import { Dictionary, Entity, EntityName } from './models/dictionary';

const album: Entity<'album'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.commerce.productName,
	user: oneOf<EntityName>('user'),
	photos: oneOf<EntityName>('photosPage'),
	__typename: () => 'Album',
};

const user: Entity<'user'> = {
	id: primaryKey(faker.datatype.uuid),
	name: faker.name.firstName,
	username: faker.internet.userName,
	email: faker.internet.email,
	phone: faker.phone.phoneNumber,
	website: faker.internet.url,
	posts: manyOf<EntityName>('post'),
	albums: manyOf<EntityName>('album'),
	todos: manyOf<EntityName>('todo'),
	__typename: () => 'User',
};

const photosPage: Entity<'photosPage'> = {
	id: primaryKey(faker.datatype.uuid),
	data: manyOf<EntityName>('photo'),
};

const photo: Entity<'photo'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	url: faker.image.imageUrl,
	thumbnailUrl: faker.image.imageUrl,
	album: oneOf<EntityName>('album'),
	__typename: () => 'Photo',
};

const post: Entity<'post'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	body: faker.lorem.paragraphs,
	user: oneOf<EntityName>('user'),
	comments: manyOf<EntityName>('comment'),
	__typename: () => 'Post',
};

const todo: Entity<'todo'> = {
	id: primaryKey(faker.datatype.uuid),
	title: faker.name.title,
	completed: faker.datatype.boolean,
	user: oneOf<EntityName>('user'),
	__typename: () => 'Todo',
};

const comment: Entity<'comment'> = {
	id: primaryKey(faker.datatype.uuid),
	name: faker.name.firstName,
	email: faker.internet.email,
	body: faker.lorem.paragraph,
	post: oneOf<EntityName>('post'),
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
