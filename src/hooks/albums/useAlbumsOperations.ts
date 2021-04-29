import { CreateAlbumInput } from '../../models/schema';
import useValidator, { Validate } from '../validator/useValidator';
import { Album } from './models/album';
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

export interface AlbumInput {
  title: Album['title'];
  authorId: Album['author']['id'];
}

export interface AlbumsOperations {
  createAlbum: (input: AlbumInput) => void;
  updateAlbum: (id: Album['id'], input: AlbumInput) => void;
  deleteAlbum: (id: Album['id']) => void;
  validateTitle: Validate<AlbumInput['title']>
}

type Operations = AlbumsOperations;

const useAlbumsOperations = (): Operations => {
  const [createAlbumMutation] = useCreateAlbum();
  const [updateAlbumMutation] = useUpdateAlbum();
  const [deleteAlbumMutation] = useDeleteAlbum();

  const validateTitle = useValidator<AlbumInput['title']>([
    { rule: (input: string) => !RegExp(/-/).test(input), errorMessage: 'Contains an illegal character.' },
    { rule: (input: string) => input.length >= 5, errorMessage: 'Should be at least 5 characters' },
  ]);

  const toInputDTO = (input: AlbumInput): CreateAlbumInput => ({
    title: input.title,
    userId: input.authorId,
  });

  const createAlbum: Operations['createAlbum'] = (input) => {
    const { isValid } = validateTitle(input.title);

    if (isValid) {
      createAlbumMutation({ variables: { input: toInputDTO(input) } });
    }
  };

  const updateAlbum: Operations['updateAlbum'] = (id, input) => {
    const { isValid } = validateTitle(input.title);

    if (isValid) {
      updateAlbumMutation({ variables: { id, input: toInputDTO(input) } });
    }
  };

  const deleteAlbum: Operations['deleteAlbum'] = (id) => {
    deleteAlbumMutation({ variables: { id } });
  };

  return ({
    createAlbum,
    updateAlbum,
    deleteAlbum,
    validateTitle,
  });
};

export default useAlbumsOperations;
