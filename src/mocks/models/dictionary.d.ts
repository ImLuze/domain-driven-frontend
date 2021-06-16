import { Limit, Entity as MSWEntity } from '@mswjs/data/lib/glossary';
import {
	Album as AlbumDTO,
	Photo as PhotoDTO,
	PhotosPage as PhotosPageDTO,
	Post as PostDTO,
	User as UserDTO,
	Todo as TodoDTO,
	Comment as CommentDTO,
} from '../../models/schema';

type WithID<E> = E & { id: string };

export type Dictionary = Limit<{
	album: AlbumDTO;
	user: UserDTO;
	photosPage: WithID<PhotosPageDTO>;
	photo: PhotoDTO;
	post: PostDTO;
	todo: TodoDTO;
	comment: WithID<CommentDTO>;
}>;

export type EntityName = keyof Dictionary;

export type Entity<N extends EntityName> = MSWEntity<Dictionary, N>;
