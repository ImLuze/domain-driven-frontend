import { KeyboardEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { UIComponent } from '../../models/component';
import AlbumCardStyle from './AlbumCardStyle';
import useAlbumCard, { AlbumCardProps } from './useAlbumCard';

/**
 * This is the Layout of the component. It calls its UI Logic hook and hooks up the logic and data
 * to the actual component. The components in this `components` directory are supposed to fully
 * reusable and are usually used on multiple pages. If you prefer, you could also merge the style
 * file into this one as they are both part of the Presentation layer. If the Layout changes,
 * usually the styling changes with it.
 */

const AlbumCard: UIComponent<AlbumCardProps> = (props) => {
	const { models, operations } = useAlbumCard(props);
	const {
		title, username, url, isEditing, errorMessage,
	} = models;
	const { setTitle, setIsEditing, submitAlbum } = operations;

	/* OnEnterClick is an event handler, it's part of hooking up UI Logic to user events. While the UI
	Logic decides WHAT happens, the Presentation component decides WHEN it happens. */
	const onEnterClick: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === 'Enter') submitAlbum();
	};

	return (
		<AlbumCardStyle onKeyDown={onEnterClick}>
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
