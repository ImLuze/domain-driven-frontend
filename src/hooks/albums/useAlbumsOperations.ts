import { useHistory } from 'react-router';
import { CreateAlbumInput as CreateAlbumInputDTO, UpdateAlbumInput as UpdateAlbumInputDTO } from '../../models/schema';
import useValidator, { Validate } from '../validator/useValidator';
import { Album, Photo } from './models/album';
import { useCreateAlbum } from './models/createAlbum';
import { useDeleteAlbum } from './models/deleteAlbum';
import { useUpdateAlbum } from './models/updateAlbum';

/**
 * This hook is the decision making layer (Interaction layer).
 * It sends out our API requests and enforces a set of rules or delegates
 * a set of actions for each request.
 *
 * This hook can be combined with `useAlbums` if both are small or easy to manage.
 */

export interface CreateAlbumInput {
  title: Album['title'];
  photos: Omit<Photo, 'id'>[]
}

export interface UpdateAlbumInput {
  title?: Album['title'];
  photos?: Omit<Photo, 'id'>[]
}

export interface AlbumsOperations {
  createAlbum: (input: CreateAlbumInput) => Promise<void>;
  updateAlbum: (id: Album['id'], input: UpdateAlbumInput) => Promise<void>;
  deleteAlbum: (id: Album['id']) => Promise<void>;
  validateTitle: Validate<Album['title']>;
  validatePhotos: Validate<CreateAlbumInput['photos']>;
}

type Operations = AlbumsOperations;

const useAlbumsOperations = (): Operations => {
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

  const toCreateInputDTO = (input: CreateAlbumInput): CreateAlbumInputDTO => ({
    title: input.title,
    userId: '0',
  });

  const toUpdateInputDTO = (input: UpdateAlbumInput): UpdateAlbumInputDTO => ({
    title: input.title,
    userId: '0',
  });

  const createAlbum: Operations['createAlbum'] = async (input) => {
    const { isValid: isTitleValid } = validateTitle(input.title);
    const { isValid: isPhotosValid } = validatePhotos(input.photos);

    if (isTitleValid && isPhotosValid) {
      const { data } = await createAlbumMutation({ variables: { input: toCreateInputDTO(input) } });
      const newAlbumId = data?.createAlbum?.id;

      if (newAlbumId) {
        history.push(`/albums/${newAlbumId}`);
      }
    }
  };

  const updateAlbum: Operations['updateAlbum'] = async (id, input) => {
    const isTitleValid = input.title ? validateTitle(input.title).isValid : true;
    const isPhotosValid = input.photos ? validatePhotos(input.photos).isValid : true;

    if (isTitleValid && isPhotosValid) {
      await updateAlbumMutation({ variables: { id, input: toUpdateInputDTO(input) } });
    }
  };

  const deleteAlbum: Operations['deleteAlbum'] = async (id) => {
    await deleteAlbumMutation({ variables: { id } });
  };

  return ({
    createAlbum,
    updateAlbum,
    deleteAlbum,
    validateTitle,
    validatePhotos,
  });
};

export default useAlbumsOperations;
