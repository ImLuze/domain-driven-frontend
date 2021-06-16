import { useEffect } from 'react';
import { useHistory } from 'react-router';
import event from '../../event';
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

type Models = Routes;

const useRoutes: InteractionLogic<undefined, undefined, Models> = () => {
	const history = useHistory();

	const routes: Routes = {
		home: '/',
		albums: {
			add: '/albums/add',
			detail: '/albums/:id',
		},
	};

	const goToAlbumDetail = (id: Album['id']): void => {
		history.push(`${routes.albums.detail}`.replace(':id', id));
	};

	useEffect(() => {
		event.on('albumCreated', goToAlbumDetail);

		return () => {
			event.removeListener('albumCreated', goToAlbumDetail);
		};
	}, [goToAlbumDetail]);

	return {
		models: routes,
	};
};

export default useRoutes;
