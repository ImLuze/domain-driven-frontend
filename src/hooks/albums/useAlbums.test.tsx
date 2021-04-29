import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { ApolloError, ApolloProvider } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import client from '../../client';
import useAlbums, { AlbumsAPI } from './useAlbums';
import { MOCK_ALBUMS } from '../../mocks/handlers';
import { Album } from './models/album';
import * as useCreateAlbum from './models/createAlbum';
import * as useDeleteAlbum from './models/deleteAlbum';
import * as useUpdateAlbum from './models/updateAlbum';

/**
 * This is a Unit Test for an Interaction layer hook.
 * It mocks our API and tests if our Interaction layer enforces the expected behavior.
 *
 * Note: Don't write Unit Tests like this. Don't test everything. Unit Tests serve as a way to
 * document code. You should only write a Unit Test for a piece of code if:
 * 1. The piece of logic has some behavior which should be documented or
 *    can't easily be infered from the code.
 * 2. To help with debugging a piece of code.
 *
 * (More on this: https://github.com/ImLuze/frontend-architecture-demo#testing)
 */

const MOCK_SUCCESSFUL: AlbumsAPI = {
  data: { albums: { data: MOCK_ALBUMS } },
  loading: false,
  error: undefined,
};

const MOCK_LOADING: AlbumsAPI = {
  data: undefined,
  loading: true,
  error: undefined,
};

const MOCK_FAILED: AlbumsAPI = {
  data: undefined,
  loading: false,
  error: new ApolloError({}),
};

const EXPECTED_ALBUMS: Album[] = [
  {
    id: '0', title: 'title 0', author: { id: '0', username: 'username 0' }, url: '/albums/0',
  },
  {
    id: '1', title: 'title 1', author: { id: '1', username: 'username 1' }, url: '/albums/1',
  },
  {
    id: '2', title: 'title 2', author: { id: '2', username: 'username 2' }, url: '/albums/2',
  },
  {
    id: '3', title: 'title 3', author: { id: '3', username: 'username 3' }, url: '/albums/3',
  },
  {
    id: '4', title: 'title 4', author: { id: '4', username: 'username 4' }, url: '/albums/4',
  },
  {
    id: '5', title: 'title 5', author: { id: '5', username: 'username 5' }, url: '/albums/5',
  },
];

const wrapper: FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

describe('useAlbums', () => {
  describe('has a set of models', () => {
    it('returns albums correctly mapped from the API albums', async () => {
      const { result, rerender } = renderHook((props) => useAlbums(props), { wrapper, initialProps: MOCK_LOADING });
      expect(result.current.models.albums).toStrictEqual([]);

      rerender(MOCK_SUCCESSFUL);
      expect(result.current.models.albums).toStrictEqual(EXPECTED_ALBUMS);

      rerender(MOCK_FAILED);
      expect(result.current.models.albums).toStrictEqual([]);
    });

    it('returns the albums query loading state', () => {
      const { result, rerender } = renderHook((props) => useAlbums(props), { wrapper, initialProps: MOCK_LOADING });
      expect(result.current.models.isLoading).toBe(true);

      rerender(MOCK_SUCCESSFUL);
      expect(result.current.models.isLoading).toBe(false);

      rerender(MOCK_FAILED);
      expect(result.current.models.isLoading).toBe(false);
    });

    it('returns the albums query error response', () => {
      const { result, rerender } = renderHook((props) => useAlbums(props), { wrapper, initialProps: MOCK_LOADING });
      expect(result.current.models.error).toBeUndefined();

      rerender(MOCK_SUCCESSFUL);
      expect(result.current.models.error).toBeUndefined();

      rerender(MOCK_FAILED);
      expect(result.current.models.error).toBeDefined();
    });
  });

  describe('has a set of operations', () => {
    describe('validateTitle', () => {
      describe('validates an album title', () => {
        it('does not allow fewer than 5 character', () => {
          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(result.current.operations.validateTitle('abcd')).toStrictEqual(expect.objectContaining({ isValid: false }));
          expect(result.current.operations.validateTitle('abcde')).toStrictEqual(expect.objectContaining({ isValid: true }));
        });

        it('should include no -', () => {
          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(result.current.operations.validateTitle('abcd-')).toStrictEqual(expect.objectContaining({ isValid: false }));
          expect(result.current.operations.validateTitle('abcde')).toStrictEqual(expect.objectContaining({ isValid: true }));
        });
      });
    });

    describe('createAlbum', () => {
      describe('when album title is valid', () => {
        it('calls the createAlbum mutation', () => {
          const createAlbumMutation = jest.fn();
          jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);
          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(createAlbumMutation).toHaveBeenCalledTimes(0);

          act(() => {
            result.current.operations.createAlbum({ title: 'abcde', authorId: '0' });
          });

          expect(createAlbumMutation).toHaveBeenCalledTimes(1);
        });
      });

      describe('when album title is invalid', () => {
        it('does nothing', () => {
          const createAlbumMutation = jest.fn();
          jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);
          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(createAlbumMutation).toHaveBeenCalledTimes(0);

          act(() => {
            result.current.operations.createAlbum({ title: 'abcd', authorId: '0' });
          });

          expect(createAlbumMutation).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('updateAlbum', () => {
      describe('when album title is valid', () => {
        it('calls the updateAlbum mutation', () => {
          const updateAlbumMutation = jest.fn();
          jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);
          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

          act(() => {
            result.current.operations.updateAlbum('0', { title: 'abcde', authorId: '0' });
          });

          expect(updateAlbumMutation).toHaveBeenCalledTimes(1);
        });
      });

      describe('when album title is invalid', () => {
        it('does nothing', () => {
          const updateAlbumMutation = jest.fn();
          jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
            called: true, loading: false, data: undefined, error: undefined, client,
          }]);

          const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

          expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

          act(() => {
            result.current.operations.updateAlbum('0', { title: 'abcd', authorId: '0' });
          });

          expect(updateAlbumMutation).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('deleteAlbum', () => {
      it('calls the deleteAlbum mutation', () => {
        const deleteAlbumMutation = jest.fn();
        jest.spyOn(useDeleteAlbum, 'useDeleteAlbum').mockReturnValue([deleteAlbumMutation, {
          called: true, loading: false, data: undefined, error: undefined, client,
        }]);
        const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL), { wrapper });

        expect(deleteAlbumMutation).toHaveBeenCalledTimes(0);

        act(() => {
          result.current.operations.deleteAlbum('0');
        });

        expect(deleteAlbumMutation).toHaveBeenCalledTimes(1);
      });
    });
  });
});
