import { ApolloError } from '@apollo/client';
import event from '../../event';
import { ApolloAPI } from '../../models/API';
import { InteractionLogic } from '../../models/logic';
import { Album as AlbumDTO, Maybe } from '../../models/schema';
import useRoutes from '../routes/useRoutes';
import useValidator, { Validate } from '../validator/useValidator';
import AlbumMapper from './AlbumMapper';
import { Album } from './models/album';
import { CreateAlbumInput, UpdateAlbumInput } from './models/albumInput';
import { useCreateAlbum } from './models/createAlbum';
import { useDeleteAlbum } from './models/deleteAlbum';
import { useUpdateAlbum } from './models/updateAlbum';

/**
 * This hook enforces a consistent behavior throughout our application. This particular hook
 * can handle data from the `albums` and the `album` query.
 */

export type AlbumsAPI = ApolloAPI<'albums' | 'album'>;

interface Operations {
	createAlbum: (input: CreateAlbumInput) => Promise<void>;
	updateAlbum: (id: Album['id'], input: UpdateAlbumInput) => Promise<void>;
	deleteAlbum: (id: Album['id']) => Promise<void>;
	validateTitle: Validate<Album['title']>;
	validatePhotos: Validate<CreateAlbumInput['photos']>;
}

interface Models {
	album?: Album;
	albums: Album[];
	isLoading: boolean;
	error?: ApolloError;
}

export interface AlbumEvents {
	'albumCreated': (id: Album['id']) => void;
}

const useAlbums: InteractionLogic<AlbumsAPI, Operations, Models> = (albumsAPI) => {
	const { models: routes } = useRoutes();
	const [createAlbumMutation] = useCreateAlbum({ refetchQueries: ['getAlbums'] });
	const [updateAlbumMutation] = useUpdateAlbum();
	const [deleteAlbumMutation] = useDeleteAlbum();
	const mapper = new AlbumMapper(routes);

	const validateTitle = useValidator<CreateAlbumInput['title']>([
		{ rule: (input) => !RegExp(/-/).test(input), errorMessage: 'Contains an illegal character.' },
		{ rule: (input) => input.length >= 5, errorMessage: 'Should be at least 5 characters.' },
	]);

	const validatePhotos = useValidator<CreateAlbumInput['photos']>([
		{ rule: (photos) => photos.length > 0, errorMessage: 'Should contain at least 1 photo.' },
	]);

	const createAlbum: Operations['createAlbum'] = async (input) => {
		const { isValid: isTitleValid } = validateTitle(input.title);
		const { isValid: isPhotosValid } = validatePhotos(input.photos);

		if (isTitleValid && isPhotosValid) {
			const inputDTO = mapper.createInputToCreateInputDTO(input);
			const result = await createAlbumMutation({ variables: { input: inputDTO } });
			const newAlbumId = result?.data?.createAlbum?.id;

			if (newAlbumId) {
				event.emit('albumCreated', newAlbumId);
			}
		}
	};

	const updateAlbum: Operations['updateAlbum'] = async (id, input) => {
		const isTitleValid = input.title ? validateTitle(input.title).isValid : true;
		const isPhotosValid = input.photos ? validatePhotos(input.photos).isValid : true;

		if (isTitleValid && isPhotosValid) {
			const inputDTO = mapper.updateInputToUpdateInputDTO(input);
			await updateAlbumMutation({ variables: { id, input: inputDTO } });
		}
	};

	const deleteAlbum: Operations['deleteAlbum'] = async (id) => {
		await deleteAlbumMutation({ variables: { id } });
	};

	const extractAlbumDTOsFromData = (data: AlbumsAPI['data']): (Maybe<AlbumDTO> | undefined)[] => {
		if (data?.albums?.data) {
			return data?.albums.data;
		}

		if (data?.album) {
			return [data?.album];
		}

		return [];
	};

	const albums = albumsAPI?.data
		? extractAlbumDTOsFromData(albumsAPI.data).map(mapper.albumDTOToAlbum)
		: [];

	return {
		operations: {
			createAlbum,
			updateAlbum,
			deleteAlbum,
			validateTitle,
			validatePhotos,
		},
		models: {
			album: albums[0],
			albums,
			isLoading: albumsAPI ? albumsAPI.loading : false,
			error: albumsAPI ? albumsAPI.error : undefined,
		},
	};
};

export default useAlbums;
