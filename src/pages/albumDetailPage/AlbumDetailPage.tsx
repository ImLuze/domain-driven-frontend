import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Gallery from '../../components/gallery/Gallery';
import useAlbums from '../../hooks/albums/useAlbums';
import { PageComponent } from '../../models/component';
import AlbumDetailPageStyle from './AlbumDetailPageStyle';
import { useGetAlbumById } from './models/getAlbumById';

/**
 * The Page Component has no logic of its own. It simply calls the necessary interaction
 * layer hooks and hooks them up to the View layer.
 */

const AlbumDetailPage: PageComponent = ({ routes }) => {
	const { id } = useParams<{ id: string }>();
	// Let the useAlbums interaction layer handle our API data.
	const { models } = useAlbums(useGetAlbumById({ variables: { id } }));
	const { album, isLoading, error } = models;

	return (
		<AlbumDetailPageStyle>
			<div className="header">
				<h1>{album?.title || 'album'}</h1>
				<Link to={routes.home}>Back to overview</Link>
			</div>

			<p className="author">{isLoading ? 'Loading...' : album?.author.username}</p>

			{error
				? <p>Oops, something went wrong</p>
				: <Gallery isLoading={isLoading} photos={album?.photos || []} />}
		</AlbumDetailPageStyle>
	);
};

export default AlbumDetailPage;
