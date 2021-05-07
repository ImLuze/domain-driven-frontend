import { act, renderHook } from '@testing-library/react-hooks';
import useAlbumCard, { AlbumCardProps } from './useAlbumCard';

/**
 * This is a Unit Test for the UI Logic. Notice how it does not test the UI, only the logic. The UI
 * itself is an implementation detail, a means to an end. Testing the UI would not only complicate
 * our unit tests, it would not provide much added value.
 *
 * Note: The unit tests here are very excessive. Don't unit test everything. Unit Tests serve as
 * a way to document code. You should only write a Unit Test for a piece of code if:
 * 1. Your component solves a complex issue that needs to be documented or you notice from PR
 *    reviews that someone doesn't understand what you are trying to do.
 * 2. The issue you are solving is not being covered by an integration test.
 * 3. You need help debugging something that is cumbersome to test in a real life situation.
 */

const props: AlbumCardProps = {
	album: {
		id: '0',
		title: 'title',
		url: 'url',
	},
	author: {
		id: '1',
		username: 'username',
	},
	operations: {
		updateAlbum: jest.fn(),
		validateTitle: jest.fn((title: string) => {
			if (title === 'invalid title') {
				return ({ isValid: false, errorMessage: 'error', errorMessages: ['error'] });
			}

			return ({ isValid: true, errorMessage: undefined, errorMessages: [] });
		}),
	},
};

describe('AlbumCard', () => {
	describe('has a set of default models', () => {
		let models: ReturnType<typeof useAlbumCard>['models'];

		beforeEach(() => {
			const { result } = renderHook(() => useAlbumCard(props));
			models = result.current.models;
		});

		it('returns the album title', () => {
			expect(models.title).toBe(props.album.title);
		});

		it('returns the album url', () => {
			expect(models.url).toBe(props.album.url);
		});

		it('returns the author username', () => {
			expect(models.username).toBe(props.author.username);
		});

		it('returns isEditing as false', () => {
			expect(models.isEditing).toBe(false);
		});

		it('returns no errorMessage', () => {
			expect(models.errorMessage).toBeFalsy();
		});
	});

	describe('has a set of operations', () => {
		describe('setIsEditing', () => {
			it('updates isEditing', () => {
				const { result } = renderHook(() => useAlbumCard(props));
				expect(result.current.models.isEditing).toBe(false);

				act(() => result.current.operations.setIsEditing(true));
				expect(result.current.models.isEditing).toBe(true);

				act(() => result.current.operations.setIsEditing(false));
				expect(result.current.models.isEditing).toBe(false);
			});
		});

		describe('setTitle', () => {
			it('updates the title', () => {
				const { result } = renderHook(() => useAlbumCard(props));
				expect(result.current.models.title).toBe(props.album.title);

				act(() => result.current.operations.setTitle('another title'));
				expect(result.current.models.title).toBe('another title');
			});

			it('validates the title', () => {
				const { result } = renderHook(() => useAlbumCard(props));
				expect(result.current.models.errorMessage).toBeFalsy();

				act(() => result.current.operations.setTitle('invalid title'));
				expect(result.current.models.errorMessage).toBe('error');

				act(() => result.current.operations.setTitle('valid title'));
				expect(result.current.models.errorMessage).toBeFalsy();
			});
		});

		describe('submitAlbum', () => {
			describe('submits the updates to the album', () => {
				describe('when the title is valid', () => {
					it('calls updateAlbum with the album id, author id and new title', () => {
						const { result } = renderHook(() => useAlbumCard({ ...props, album: { ...props.album, title: 'valid title' } }));
						expect(props.operations.updateAlbum).not.toBeCalled();

						act(result.current.operations.submitAlbum);
						expect(props.operations.updateAlbum).toBeCalledTimes(1);
						expect(props.operations.updateAlbum).toBeCalledWith(props.album.id, { title: 'valid title' });
					});

					it('sets isEditing to false', () => {
						const { result } = renderHook(() => useAlbumCard({ ...props, album: { ...props.album, title: 'valid title' } }));
						act(() => result.current.operations.setIsEditing(true));
						expect(result.current.models.isEditing).toBe(true);

						act(result.current.operations.submitAlbum);
						expect(result.current.models.isEditing).toBe(false);
					});
				});

				describe('when the title is invalid', () => {
					it('does not call updateAlbum', () => {
						const { result } = renderHook(() => useAlbumCard({ ...props, album: { ...props.album, title: 'invalid title' } }));
						expect(props.operations.updateAlbum).not.toBeCalled();

						act(result.current.operations.submitAlbum);
						expect(props.operations.updateAlbum).not.toBeCalled();
					});

					it('does not set isEditing to false', () => {
						const { result } = renderHook(() => useAlbumCard({ ...props, album: { ...props.album, title: 'invalid title' } }));
						act(() => result.current.operations.setIsEditing(true));
						expect(result.current.models.isEditing).toBe(true);

						act(result.current.operations.submitAlbum);
						expect(result.current.models.isEditing).toBe(true);
					});
				});
			});
		});
	});
});
