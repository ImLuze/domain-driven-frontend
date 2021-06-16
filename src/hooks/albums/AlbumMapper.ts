import { Album, Author, Photo } from './models/album';
import {
	Maybe,
	Album as AlbumDTO,
	User as UserDTO,
	Photo as PhotoDTO,
	CreateAlbumInput as CreateAlbumInputDTO,
	UpdateAlbumInput as UpdateAlbumInputDTO,
} from '../../models/schema';
import { CreateAlbumInput, UpdateAlbumInput } from './models/albumInput';
import { Routes } from '../routes/models/routes';

/**
 * This class maps all our DTOs (Data Transfer Object) to more useable models or back.
 * Converting these prevents our code from being cluttered with null checks or allows us to
 * add frontend specific object keys.
 */

class AlbumMapper {
	private routes: Routes;

	constructor(routes: Routes) {
		this.routes = routes;
	}

	userDTOToAuthor = (user: UserDTO): Author => ({
		id: user.id || '',
		username: user.username || 'unknown',
	});

	photoDTOToPhoto = (photo: Maybe<Maybe<PhotoDTO>>): Photo => ({
		id: photo?.id || '',
		alt: photo?.title || 'no title',
		url: photo?.url || '',
	});

	albumDTOToAlbum = (album?: Maybe<AlbumDTO>): Album => ({
		id: album?.id || '',
		title: album?.title || '',
		url: this.routes.albums.detail.replace(':id', album?.id || ''),
		author: this.userDTOToAuthor(album?.user || {}),
		photos: (album?.photos?.data || []).map(this.photoDTOToPhoto),
	});

	createInputToCreateInputDTO = (input: CreateAlbumInput): CreateAlbumInputDTO => ({
		title: input.title,
		userId: '0',
	});

	updateInputToUpdateInputDTO = (input: UpdateAlbumInput): UpdateAlbumInputDTO => ({
		title: input.title,
		userId: '0',
	});
}

export default AlbumMapper;
