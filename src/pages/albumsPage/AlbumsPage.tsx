import { Link } from 'react-router-dom';
import useAlbums from '../../hooks/albums/useAlbums';
import { PageComponent } from '../../models/PageComponent';
import AlbumsPageStyle from './AlbumsPageStyle';
import AlbumsSection from './components/albumsSection/AlbumsSection';
import { useGetAlbums } from './models/getAlbums';

/**
 * This is our Page Component (also known as Container Component).
 * It glues our `Interaction` layer (useAlbums hook) to our `View` layer (React Components).
 * It delegates user events triggered by the React Components back to the interaction layer.
 *
 * (Note: These Page Components generally don't have any logic of their own.)
*/

const AlbumsPage: PageComponent = () => {
	const { operations, models } = useAlbums(useGetAlbums());
	const { updateAlbum, validateTitle } = operations;
	const { albums, isLoading, error } = models;

	return (
		<AlbumsPageStyle>
			<header className="header">
				<h1>Albums Page</h1>
				<Link to="/albums/add">Add new album</Link>
			</header>
			<AlbumsSection
				albums={albums}
				isLoading={isLoading}
				hasError={!!error}
				operations={{
					updateAlbum,
					validateTitle,
				}}
			/>
		</AlbumsPageStyle>
	);
};

export default AlbumsPage;
