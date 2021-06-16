import type { Album, Photo } from './album';

/**
 * These are the types we will use throughout the application.
 * They are our frontend schema so to speak.
 * They sit in a declaration file to indicate that they hold nothing but type declarations.
 */

export interface CreateAlbumInput {
	title: Album['title'];
	photos: Omit<Photo, 'id'>[]
}

export interface UpdateAlbumInput {
	title?: Album['title'];
	photos?: Omit<Photo, 'id'>[]
}
