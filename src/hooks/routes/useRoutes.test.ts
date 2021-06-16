import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router';
import events from '../../event';
import useRoutes from './useRoutes';

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

	describe('on event', () => {
		describe('albumCreated', () => {
			it('goes to the album detail page', () => {
				renderHook(useRoutes, { wrapper: MemoryRouter });
				expect(mockHistoryPush).not.toHaveBeenCalled();

				events.emit('albumCreated', '0');
				expect(mockHistoryPush).toHaveBeenCalledWith('/albums/0');
			});
		});
	});
});
