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

class AlbumMapper {
	public static userDTOToAuthor = (user: UserDTO): Author => ({
		id: user.id || '',
		username: user.username || 'unknown',
	});

	public static photoDTOToPhoto = (photo: Maybe<Maybe<PhotoDTO>>): Photo => ({
		id: photo?.id || '',
		alt: photo?.title || 'no title',
		url: photo?.url || '',
	});

	public static albumDTOToAlbum = (album: Maybe<AlbumDTO>): Album => ({
		id: album?.id || '',
		title: album?.title || '',
		url: `/albums/${album?.id}`,
		author: AlbumMapper.userDTOToAuthor(album?.user || {}),
		photos: (album?.photos?.data || []).map(AlbumMapper.photoDTOToPhoto),
	});

	public static createInputToCreateInputDTO = (input: CreateAlbumInput): CreateAlbumInputDTO => ({
		title: input.title,
		userId: '0',
	});

	public static updateInputToUpdateInputDTO = (input: UpdateAlbumInput): UpdateAlbumInputDTO => ({
		title: input.title,
		userId: '0',
	});
}

export default AlbumMapper;
