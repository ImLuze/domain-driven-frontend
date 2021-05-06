import { Link } from 'react-router-dom';
import useAlbums from '../../hooks/albums/useAlbums';
import { PageComponent } from '../../models/PageComponent';
import AlbumsPageStyle from './AlbumsPageStyle';
import AlbumsSection from './components/albumsSection/AlbumsSection';
import { useGetAlbums } from './models/getAlbums';

/**
 * The Page Component has no logic of its own. It simply calls the necessary interaction
 * layer hooks and hooks them up to the View layer.
 */

const AlbumsPage: PageComponent = ({ routes }) => {
	// Let the useAlbums interaction layer handle our API data.
	const { operations, models } = useAlbums(useGetAlbums());
	const { updateAlbum, validateTitle } = operations;
	const { albums, isLoading, error } = models;

	return (
		<AlbumsPageStyle>
			<header className="header">
				<h1>Albums Page</h1>
				<Link to={routes.albums.add}>Add new album</Link>
			</header>
			<AlbumsSection
				// Pass the necessary data to our View layer.
				albums={albums}
				isLoading={isLoading}
				hasError={!!error}
				// Delegate operations back to our Interaction layer.
				operations={{
					updateAlbum,
					validateTitle,
				}}
			/>
		</AlbumsPageStyle>
	);
};

export default AlbumsPage;
