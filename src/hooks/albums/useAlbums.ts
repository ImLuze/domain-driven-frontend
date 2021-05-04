import { ApolloError } from '@apollo/client';
import { AppLogic } from '../../models/logic';
import {
  Maybe, Photo as PhotoDTO, Album as AlbumDTO, Query, User as UserDTO,
} from '../../models/schema';
import { Album, Author, Photo } from './models/album';
import useAlbumsOperations, { AlbumsOperations } from './useAlbumsOperations';

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

type Operations = AlbumsOperations;

interface Models {
  album?: Album;
  albums: Album[];
  isLoading: boolean;
  error?: ApolloError;
}

const useAlbums = (albumsAPI: AlbumsAPI): AppLogic<Operations, Models> => {
  const userDTOToAuthor = (user: UserDTO): Author => ({
    id: user.id || '',
    username: user.username || 'unknown',
  });

  const photoDTOToPhoto = (photo: Maybe<Maybe<PhotoDTO>>): Photo => ({
    id: photo?.id || '',
    alt: photo?.title || 'no title',
    url: photo?.url || '',
  });

  const albumDTOToAlbum = (album: Maybe<AlbumDTO>): Album => ({
    id: album?.id || '',
    title: album?.title || '',
    url: `/albums/${album?.id}`,
    author: userDTOToAuthor(album?.user || {}),
    photos: (album?.photos?.data || []).map(photoDTOToPhoto),
  });

  const extractAlbumDTOsFromData = (data: AlbumsAPI['data']): Maybe<AlbumDTO>[] => {
    if (data?.albums?.data) {
      return data?.albums.data;
    }

    if (data?.album) {
      return [data?.album];
    }

    return [];
  };

  const albums = albumsAPI.data
    ? extractAlbumDTOsFromData(albumsAPI.data).map(albumDTOToAlbum)
    : [];
  const [album] = albums;

  return {
    operations: useAlbumsOperations(),
    models: {
      album,
      albums,
      isLoading: albumsAPI.loading,
      error: albumsAPI.error,
    },
  };
};

export default useAlbums;
