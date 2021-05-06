/**
 * These are the types we will use throughout the application.
 * They are our frontend schema so to speak.
 * They sit in a declaration file to indicate that they hold nothing but type declarations.
 */

interface AlbumRoutes {
	add: string;
	detail: string;
}

export interface Routes {
	home: string;
	albums: AlbumRoutes;
}
