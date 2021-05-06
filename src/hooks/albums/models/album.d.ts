/**
 * These are the types we will use throughout the application.
 * They are our frontend schema so to speak.
 * They sit in a declaration file to indicate that they hold nothing but type declarations.
 */

export interface Photo {
	id: string;
	alt: string;
	url: string;
}

export interface Author {
	id: string;
	username: string;
}

export interface Album {
	id: string;
	title: string;
	url: string;
	author: Author;
	photos: Photo[];
}
