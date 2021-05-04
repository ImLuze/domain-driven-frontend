import { ApolloError } from '@apollo/client';
import { useHistory } from 'react-router';
import { AppLogic } from '../../models/logic';
import { Maybe, Album as AlbumDTO, Query } from '../../models/schema';
import useValidator, { Validate } from '../validator/useValidator';
import AlbumMapper from './AlbumMapper';
import { Album } from './models/album';
import { CreateAlbumInput, UpdateAlbumInput } from './models/albumInput';
import { useCreateAlbum } from './models/createAlbum';
import { useDeleteAlbum } from './models/deleteAlbum';
import { useUpdateAlbum } from './models/updateAlbum';

/**
 * This hook is the decision making layer (Interaction layer).
 * It maps API data to a set of application-specific interfaces.
 * This hook decides which domain specific models and operations the application has access to.
 *
 * This hook can be combined with `useAlbumsOperations` if both are small or easy to manage.
 */

export interface AlbumsAPI {
  data?: Maybe<Pick<Query, 'albums' | 'album'>>;
  loading: boolean;
  error?: ApolloError;
}

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

const useAlbums = (albumsAPI?: AlbumsAPI): AppLogic<Operations, Models> => {
  const history = useHistory();
  const [createAlbumMutation] = useCreateAlbum();
  const [updateAlbumMutation] = useUpdateAlbum();
  const [deleteAlbumMutation] = useDeleteAlbum();

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
      const inputDTO = AlbumMapper.createInputToCreateInputDTO(input);
      const result = await createAlbumMutation({ variables: { input: inputDTO } });
      const newAlbumId = result?.data?.createAlbum?.id;

      if (newAlbumId) {
        history.push(`/albums/${newAlbumId}`);
      }
    }
  };

  const updateAlbum: Operations['updateAlbum'] = async (id, input) => {
    const isTitleValid = input.title ? validateTitle(input.title).isValid : true;
    const isPhotosValid = input.photos ? validatePhotos(input.photos).isValid : true;

    if (isTitleValid && isPhotosValid) {
      const inputDTO = AlbumMapper.updateInputToUpdateInputDTO(input);
      await updateAlbumMutation({ variables: { id, input: inputDTO } });
    }
  };

  const deleteAlbum: Operations['deleteAlbum'] = async (id) => {
    await deleteAlbumMutation({ variables: { id } });
  };

  const extractAlbumDTOsFromData = (data: AlbumsAPI['data']): Maybe<AlbumDTO>[] => {
    if (data?.albums?.data) {
      return data?.albums.data;
    }

    if (data?.album) {
      return [data?.album];
    }

    return [];
  };

  const albums = albumsAPI?.data
    ? extractAlbumDTOsFromData(albumsAPI.data).map(AlbumMapper.albumDTOToAlbum)
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
