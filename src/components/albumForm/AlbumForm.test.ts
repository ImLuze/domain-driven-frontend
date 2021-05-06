import { act, renderHook } from '@testing-library/react-hooks';
import { CreateAlbumInput } from '../../hooks/albums/models/albumInput';
import useAlbumForm, { AlbumFormProps } from './useAlbumForm';

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

const props: AlbumFormProps = {
	operations: {
		onSubmit: jest.fn(),
		validateTitle: jest.fn((title: string) => {
			if (title === 'invalid title' || title === '') {
				return ({ isValid: false, errorMessage: 'error', errorMessages: ['error'] });
			}

			return ({ isValid: true, errorMessage: undefined, errorMessages: [] });
		}),
		validatePhotos: jest.fn((photos: CreateAlbumInput['photos']) => {
			if (photos.length === 0) {
				return ({ isValid: false, errorMessage: 'error', errorMessages: ['error'] });
			}

			return ({ isValid: true, errorMessage: undefined, errorMessages: [] });
		}),
	},
};

describe('AlbumForm', () => {
	describe('has a set of default models', () => {
		let models: ReturnType<typeof useAlbumForm>['models'];

		beforeEach(() => {
			const { result } = renderHook(() => useAlbumForm(props));
			models = result.current.models;
		});

		it('returns an empty title', () => {
			expect(models.title).toBe('');
		});

		it('returns an empty photos array', () => {
			expect(models.photos).toHaveLength(0);
		});

		it('returns no errorMessage.title', () => {
			expect(models.errorMessage.title).toBeFalsy();
		});

		it('returns no errorMessage.photos', () => {
			expect(models.errorMessage.photos).toBeFalsy();
		});
	});

	describe('has a set of operations', () => {
		describe('setTitle', () => {
			it('updates the title', () => {
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.title).toBe('');

				act(() => result.current.operations.setTitle('another title'));
				expect(result.current.models.title).toBe('another title');
			});

			it('validates the title', () => {
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.errorMessage.title).toBeFalsy();

				act(() => result.current.operations.setTitle('invalid title'));
				expect(result.current.models.errorMessage.title).toBe('error');

				act(() => result.current.operations.setTitle('valid title'));
				expect(result.current.models.errorMessage.title).toBeFalsy();
			});
		});

		describe('addPhoto', () => {
			it('adds a photo to the photos array', () => {
				const PHOTO_FILE = new File(['test'], 'test.png', { type: 'image/png' });
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.photos).toHaveLength(0);

				act(() => result.current.operations.addPhoto(PHOTO_FILE));
				expect(result.current.models.photos).toHaveLength(1);
			});
		});

		describe('removePhotoAtIndex', () => {
			it('removes a photo from the photos array', () => {
				const PHOTO_FILE = new File(['test'], 'test.png', { type: 'image/png' });
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.photos).toHaveLength(0);

				act(() => result.current.operations.addPhoto(PHOTO_FILE));
				expect(result.current.models.photos).toHaveLength(1);

				act(() => result.current.operations.removePhotoAtIndex(0));
				expect(result.current.models.photos).toHaveLength(0);
			});
		});

		describe('saveAlbum', () => {
			it('validates the title', () => {
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.errorMessage.title).toBeFalsy();

				act(() => result.current.operations.setTitle('invalid title'));
				act(result.current.operations.saveAlbum);
				expect(result.current.models.errorMessage.title).toBe('error');

				act(() => result.current.operations.setTitle('valid title'));
				act(result.current.operations.saveAlbum);
				expect(result.current.models.errorMessage.title).toBeFalsy();
			});

			it('validates the photos', () => {
				const PHOTO_FILE = new File(['test'], 'test.png', { type: 'image/png' });
				const { result } = renderHook(() => useAlbumForm(props));
				expect(result.current.models.errorMessage.photos).toBeFalsy();

				act(() => result.current.operations.saveAlbum());
				expect(result.current.models.errorMessage.photos).toBe('error');

				act(() => result.current.operations.addPhoto(PHOTO_FILE));
				act(result.current.operations.saveAlbum);
				expect(result.current.models.errorMessage.photos).toBeFalsy();

				act(() => result.current.operations.removePhotoAtIndex(0));
				act(result.current.operations.saveAlbum);
				expect(result.current.models.errorMessage.photos).toBe('error');
			});
			describe('when title is valid and photos are valid', () => {
				it('calls onSubmit', () => {
					const PHOTO_FILE = new File(['test'], 'test.png', { type: 'image/png' });
					const { result } = renderHook(() => useAlbumForm(props));
					expect(props.operations.onSubmit).toHaveBeenCalledTimes(0);

					act(() => result.current.operations.setTitle('valid title'));
					act(() => result.current.operations.addPhoto(PHOTO_FILE));
					act(() => result.current.operations.saveAlbum());
					expect(props.operations.onSubmit).toHaveBeenCalledTimes(1);
				});
			});

			describe('when title is invalid or photos is invalid', () => {
				it('does not call onSubmit', () => {
					const { result } = renderHook(() => useAlbumForm(props));
					expect(props.operations.onSubmit).toHaveBeenCalledTimes(0);

					act(() => result.current.operations.setTitle('abcd'));
					act(result.current.operations.saveAlbum);

					expect(props.operations.onSubmit).toHaveBeenCalledTimes(0);
				});
			});
		});
	});
});
