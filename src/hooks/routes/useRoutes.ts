import { useHistory } from 'react-router';
import { InteractionLogic } from '../../models/logic';
import { Album } from '../albums/models/album';
import { Routes } from './models/routes';

/**
 * This hook enforces consistent routing behavior throughout our application.
 * By using the same `routes.albums.add` route everywhere instead of hard coding every instance of
 * the route allows us to easily manage / change routes in the future without accidentally leading
 * users to a 404 page.
 *
 * While it might be easy to find and replace a static route, dynamic routes are usually harder to
 * pinpoint.
 *
 * If you would for example want to track some Google Analytics data on page load, this would be a
 * good place to do it.
 */

interface Operations {
	goToAlbumDetail: (id: Album['id']) => void;
}

type Models = Routes;

const useRoutes: InteractionLogic<{}, Operations, Models> = () => {
	const history = useHistory();

	const routes: Models = {
		home: '/',
		albums: {
			add: '/albums/add',
			detail: '/albums/:id',
		},
	};

	const goToAlbumDetail: Operations['goToAlbumDetail'] = (id) => {
		history.push(`${routes.albums.detail}`.replace(':id', id));
	};

	return {
		models: routes,
		operations: {
			goToAlbumDetail,
		},
	};
};

export default useRoutes;
