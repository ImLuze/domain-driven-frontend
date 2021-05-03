import { FunctionComponent } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import AddAlbumPage from './pages/addAlbumPage/AddAlbumPage';
import AlbumsPage from './pages/albumsPage/AlbumsPage';

/**
 * This is the router of the application.
 * It handles everything that is based on the "Router state" (URL).
 * This enforces consistency on how URLs are handled throughout the application.
*/

const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path="/" component={AlbumsPage} />
    <Route path="/albums/add" component={AddAlbumPage} />
  </Switch>
);

export default Routes;
