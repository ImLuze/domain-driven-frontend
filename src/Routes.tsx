import { FunctionComponent } from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import useRoutes from './hooks/routes/useRoutes';
import AddAlbumPage from './pages/addAlbumPage/AddAlbumPage';
import AlbumDetailPage from './pages/albumDetailPage/AlbumDetailPage';
import AlbumsPage from './pages/albumsPage/AlbumsPage';

/**
 * This is the router of the application.
 * It handles everything that is based on the "Router state" (URL).
 * This enforces consistency on how URLs are handled throughout the application.
*/

const Routes: FunctionComponent = () => {
	const { models: routes } = useRoutes();

	return (
		<Switch>
			<Route exact path={routes.home} render={() => <AlbumsPage routes={routes} />} />
			<Route path={routes.albums.add} render={() => <AddAlbumPage routes={routes} />} />
			<Route path={routes.albums.detail} component={() => <AlbumDetailPage routes={routes} />} />

			{/* Updating existing routes is not always without consequences (indexing, browser history).
			Because of the consistent behavior enforced by the useRoutes hook, you can easily redirect
			existing routes to the new route without resulting in a 404 page. */}
			<Redirect from="some/path/which/we/changed" to={routes.albums.add} />
		</Switch>
	);
};

export default Routes;
