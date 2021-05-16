import { Link } from 'react-router-dom';
import AlbumForm from '../../components/albumForm/AlbumForm';
import useAlbums from '../../hooks/albums/useAlbums';
import { PageComponent } from '../../models/component';
import AddAlbumPageStyle from './AddAlbumPageStyle';

/**
 * The Page Component has no logic of its own. It simply calls the necessary interaction
 * layer hooks and hooks them up to the View layer.
 */

const AddAlbumPage: PageComponent = ({ routes }) => {
	// This page doesn't need any GraphQL queries to function.
	const { operations } = useAlbums();
	const { createAlbum, validatePhotos, validateTitle } = operations;

	return (
		<AddAlbumPageStyle>
			<header className="header">
				<h1>Add new album</h1>
				<Link to={routes.home}>Go back</Link>
			</header>
			<AlbumForm
				// Delegate operations back to our Interaction layer.
				operations={{
					onSubmit: createAlbum,
					validatePhotos,
					validateTitle,
				}}
			/>
		</AddAlbumPageStyle>
	);
};
export default AddAlbumPage;
