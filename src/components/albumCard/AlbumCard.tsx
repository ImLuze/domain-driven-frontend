import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import AlbumCardStyle from './AlbumCardStyle';
import useAlbumCard, { AlbumCardProps } from './useAlbumCard';

/**
 * This is the Layout of the component. It calls its UI Logic hook and hooks up the logic and data
 * to the actual component. The components in this `components` directory are supposed to fully
 * reusable and are usually used on multiple pages. If you prefer, you could also merge the style
 * file into this one as they are both part of the Presentation layer. If the Layout changes,
 * usually the styling changes with it.
 */

const AlbumCard: FunctionComponent<AlbumCardProps> = (props) => {
	const { models, operations } = useAlbumCard(props);
	const {
		title, username, url, isEditing, errorMessage,
	} = models;
	const { setTitle, setIsEditing } = operations;

	return (
		<AlbumCardStyle>
			{errorMessage && <p>{errorMessage}</p>}
			{isEditing
				? <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
				: (
					<div className="header">
						<h2>{title}</h2>
						<button type="button" onClick={() => setIsEditing(true)}>edit title</button>
					</div>
				)}
			<p>{username}</p>
			<Link to={url}>Go to album</Link>
		</AlbumCardStyle>
	);
};

export default AlbumCard;
