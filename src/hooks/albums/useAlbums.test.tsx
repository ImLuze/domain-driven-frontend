import { renderHook } from '@testing-library/react-hooks';
import { FunctionComponent } from 'react';
import { ApolloError, ApolloProvider } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import { graphql, RequestHandler } from 'msw';
import client from '../../client';
import useAlbums, { AlbumsAPI } from './useAlbums';
import { Album } from './models/album';
import * as useCreateAlbum from './models/createAlbum';
import * as useDeleteAlbum from './models/deleteAlbum';
import * as useUpdateAlbum from './models/updateAlbum';
import { CreateAlbumInput, UpdateAlbumInput } from './models/albumInput';
import { ApolloAPI } from '../../models/API';
import db from '../../mocks/db';
import { Album as AlbumDTO } from '../../models/schema';
import event from '../../event';
import server from '../../mocks/server';

/**
 * This is a Unit Test for an Interaction layer hook.
 * It tests if our Interaction layer enforces the expected behavior.
 *
 * Note: The unit tests here are very excessive. Don't unit test everything. Unit Tests serve as
 * a way to document code. You should only write a Unit Test for a piece of code if:
 * 1. Your hook solves a complex issue that needs to be documented or you notice from PR reviews
 *    that someone doesn't understand what you are trying to do.
 * 2. The issue you are solving is not being covered by an integration test.
 * 3. You need help debugging something that is cumbersome to test in a real life situation.
 */

const albums: AlbumDTO[] = db.album.getAll();

const MOCK_SUCCESSFUL_ALBUMS: ApolloAPI<'albums'> = {
	data: { albums: { data: albums } },
	loading: false,
	error: undefined,
};

const MOCK_SUCCESSFUL_ALBUM: ApolloAPI<'album'> = {
	data: { album: albums[0] },
	loading: false,
	error: undefined,
};

const MOCK_LOADING: ApolloAPI<'albums' | 'album'> = {
	data: undefined,
	loading: true,
	error: undefined,
};

const MOCK_FAILED: ApolloAPI<'albums' | 'album'> = {
	data: undefined,
	loading: false,
	error: new ApolloError({}),
};

const EXPECTED_ALBUMS: Album[] = albums.map((album) => ({
	id: album.id || '',
	title: album.title || '',
	url: `/albums/${album.id}`,
	author: { id: album.user?.id || '', username: album.user?.username || 'unknown' },
	photos: album.photos?.data?.map((photo) => ({
		id: photo?.id || '',
		alt: photo?.title || 'no title',
		url: photo?.url || '',
	})) || [],
}));

const mockErrorResponse: RequestHandler = graphql.mutation('createAlbum', (req, res, ctx) => res(
	ctx.data({ createAlbum: undefined }),
));

const wrapper: FunctionComponent = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
);

describe('useAlbums', () => {
	describe('has a set of models', () => {
		it('returns albums correctly mapped from the API', async () => {
			const { result, rerender } = renderHook((props: AlbumsAPI) => useAlbums(props), { wrapper });
			expect(result.current.models.albums).toStrictEqual([]);

			rerender(MOCK_LOADING);
			expect(result.current.models.albums).toStrictEqual([]);

			rerender(MOCK_SUCCESSFUL_ALBUMS);
			expect(result.current.models.albums).toStrictEqual(EXPECTED_ALBUMS);

			rerender(MOCK_SUCCESSFUL_ALBUM);
			expect(result.current.models.albums).toStrictEqual([EXPECTED_ALBUMS[0]]);

			rerender(MOCK_FAILED);
			expect(result.current.models.albums).toStrictEqual([]);
		});

		it('returns the first album correctly mapped from the API', async () => {
			const { result, rerender } = renderHook((props: AlbumsAPI) => useAlbums(props), { wrapper });
			expect(result.current.models.album).toBeUndefined();

			rerender(MOCK_LOADING);
			expect(result.current.models.album).toBeUndefined();

			rerender(MOCK_SUCCESSFUL_ALBUMS);
			expect(result.current.models.album).toStrictEqual(EXPECTED_ALBUMS[0]);

			rerender(MOCK_SUCCESSFUL_ALBUM);
			expect(result.current.models.album).toStrictEqual(EXPECTED_ALBUMS[0]);

			rerender(MOCK_FAILED);
			expect(result.current.models.album).toBeUndefined();
		});

		it('returns the albums query loading state', () => {
			const { result, rerender } = renderHook((props: AlbumsAPI) => useAlbums(props), { wrapper });
			expect(result.current.models.isLoading).toBe(false);

			rerender(MOCK_LOADING);
			expect(result.current.models.isLoading).toBe(true);

			rerender(MOCK_SUCCESSFUL_ALBUMS);
			expect(result.current.models.isLoading).toBe(false);

			rerender(MOCK_FAILED);
			expect(result.current.models.isLoading).toBe(false);
		});

		it('returns the albums query error response', () => {
			const { result, rerender } = renderHook((props: AlbumsAPI) => useAlbums(props), { wrapper });
			expect(result.current.models.error).toBeUndefined();

			rerender(MOCK_LOADING);
			expect(result.current.models.error).toBeUndefined();

			rerender(MOCK_SUCCESSFUL_ALBUMS);
			expect(result.current.models.error).toBeUndefined();

			rerender(MOCK_FAILED);
			expect(result.current.models.error).toBeDefined();
		});
	});

	describe('has a set of operations', () => {
		describe('validateTitle', () => {
			describe('validates an album title', () => {
				it('does not allow fewer than 5 character', () => {
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });

					expect(result.current.operations.validateTitle('abcd')).toStrictEqual(expect.objectContaining({ isValid: false }));
					expect(result.current.operations.validateTitle('abcde')).toStrictEqual(expect.objectContaining({ isValid: true }));
				});

				it('should include no -', () => {
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });

					expect(result.current.operations.validateTitle('abcd-')).toStrictEqual(expect.objectContaining({ isValid: false }));
					expect(result.current.operations.validateTitle('abcde')).toStrictEqual(expect.objectContaining({ isValid: true }));
				});
			});
		});

		describe('validatePhotos', () => {
			it('does not allow photos to be empty', () => {
				const PHOTOS: CreateAlbumInput['photos'] = [{ alt: 'title 0', url: '/photo/0' }];
				const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });

				expect(result.current.operations.validatePhotos([]))
					.toStrictEqual(expect.objectContaining({ isValid: false }));
				expect(result.current.operations.validatePhotos(PHOTOS))
					.toStrictEqual(expect.objectContaining({ isValid: true }));
			});
		});

		describe('createAlbum', () => {
			describe('when title is valid and has at least 1 photo', () => {
				it('calls the createAlbum mutation', async () => {
					const createAlbumMutation = jest.fn();
					jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);
					const PHOTOS: CreateAlbumInput['photos'] = [{ alt: 'new photo', url: './new-photo' }];
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(createAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.createAlbum({ title: 'abcde', photos: PHOTOS }));
					expect(createAlbumMutation).toHaveBeenCalledTimes(1);
				});

				describe('when the createAlbum mutation is successful', () => {
					it('emits an albumCreated event', async () => {
						const emitEvent = jest.fn();
						jest.spyOn(event, 'emit').mockImplementation(emitEvent);
						const PHOTOS: CreateAlbumInput['photos'] = [{ alt: 'new photo', url: './new-photo' }];
						const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
						expect(emitEvent).not.toBeCalled();

						await act(async () => result.current.operations.createAlbum({ title: 'abcde', photos: PHOTOS }));
						expect(emitEvent).toBeCalledWith('albumCreated', expect.anything());
					});
				});

				describe('when the createAlbum mutation is unsuccessful', () => {
					it('does not emit an albumCreated event', async () => {
						server.use(mockErrorResponse);
						const emitEvent = jest.fn();
						jest.spyOn(event, 'emit').mockImplementation(emitEvent);
						const PHOTOS: CreateAlbumInput['photos'] = [{ alt: 'new photo', url: './new-photo' }];
						const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
						expect(emitEvent).not.toBeCalled();

						await act(async () => result.current.operations.createAlbum({ title: 'abcde', photos: PHOTOS }));
						expect(emitEvent).not.toBeCalled();
					});
				});
			});

			describe('when title is invalid or has no photos', () => {
				it('does nothing', async () => {
					const createAlbumMutation = jest.fn();
					jest.spyOn(useCreateAlbum, 'useCreateAlbum').mockReturnValue([createAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);
					const PHOTOS: CreateAlbumInput['photos'] = [{ alt: 'new photo', url: './new-photo' }];
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(createAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.createAlbum({ title: 'abcd', photos: PHOTOS }));
					expect(createAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.createAlbum({ title: 'abcde', photos: [] }));
					expect(createAlbumMutation).toHaveBeenCalledTimes(0);
				});
			});
		});

		describe('updateAlbum', () => {
			describe('when title is valid', () => {
				it('calls the updateAlbum mutation', async () => {
					const updateAlbumMutation = jest.fn();
					jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.updateAlbum('0', { title: 'abcde' }));
					expect(updateAlbumMutation).toHaveBeenCalledTimes(1);
				});
			});

			describe('when title is invalid', () => {
				it('does nothing', async () => {
					const updateAlbumMutation = jest.fn();
					jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);

					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.updateAlbum('0', { title: 'abcd' }));
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);
				});
			});

			describe('when there is at least 1 photo', () => {
				it('calls the updateAlbum mutation', async () => {
					const updateAlbumMutation = jest.fn();
					jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);
					const PHOTOS: UpdateAlbumInput['photos'] = [{ alt: 'new photo', url: './new-photo' }];
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.updateAlbum('0', { photos: PHOTOS }));
					expect(updateAlbumMutation).toHaveBeenCalledTimes(1);
				});
			});

			describe('when the photos array is empty', () => {
				it('does nothing', async () => {
					const updateAlbumMutation = jest.fn();
					jest.spyOn(useUpdateAlbum, 'useUpdateAlbum').mockReturnValue([updateAlbumMutation, {
						called: true, loading: false, data: undefined, error: undefined, client,
					}]);
					const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);

					await act(async () => result.current.operations.updateAlbum('0', { photos: [] }));
					expect(updateAlbumMutation).toHaveBeenCalledTimes(0);
				});
			});
		});

		describe('deleteAlbum', () => {
			it('calls the deleteAlbum mutation', async () => {
				const deleteAlbumMutation = jest.fn();
				jest.spyOn(useDeleteAlbum, 'useDeleteAlbum').mockReturnValue([deleteAlbumMutation, {
					called: true, loading: false, data: undefined, error: undefined, client,
				}]);
				const { result } = renderHook(() => useAlbums(MOCK_SUCCESSFUL_ALBUMS), { wrapper });
				expect(deleteAlbumMutation).toHaveBeenCalledTimes(0);

				await act(async () => result.current.operations.deleteAlbum('0'));
				expect(deleteAlbumMutation).toHaveBeenCalledTimes(1);
			});
		});
	});
});
