import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import useRoutes from './useRoutes';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('useRoutes', () => {
	describe('has a set of default models', () => {
		it('returns all possible routes', () => {
			const { result } = renderHook(useRoutes);
			expect(result.current.models.home).toStrictEqual('/');
			expect(result.current.models.albums.add).toStrictEqual('/albums/add');
			expect(result.current.models.albums.detail).toStrictEqual('/albums/:id');
		});
	});

	describe('has a set of operations', () => {
		describe('goToAlbumDetail', () => {
			it('goes to the album detail page', () => {
				const { result } = renderHook(useRoutes, { wrapper: MemoryRouter });
				expect(mockHistoryPush).not.toHaveBeenCalled();

				act(() => result.current.operations.goToAlbumDetail('0'));
				expect(mockHistoryPush).toHaveBeenCalledWith('/albums/0');
			});
		});
	});
});
