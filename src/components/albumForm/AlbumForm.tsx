import { UIComponent } from '../../models/component';
import Gallery from '../gallery/Gallery';
import AlbumFormStyle from './AlbumFormStyle';
import useAlbumForm, { AlbumFormProps } from './useAlbumForm';

/**
 * This is the Layout of the component. It calls its UI Logic hook and hooks up the logic and data
 * to the actual component. The components in this `components` directory are supposed to fully
 * reusable and are usually used on multiple pages. If you prefer, you could also merge the style
 * file into this one as they are both part of the Presentation layer. If the Layout changes,
 * usually the styling changes with it.
 */

const AlbumForm: UIComponent<AlbumFormProps> = (props) => {
	const { operations, models } = useAlbumForm(props);
	const {
		addPhoto, removePhotoAtIndex, saveAlbum, setTitle,
	} = operations;
	const { errorMessage, photos, title } = models;

	return (
		<AlbumFormStyle>
			<div className="title-input">
				<p>{errorMessage.title}</p>
				<input
					value={title}
					placeholder="Add a title"
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>
			<label htmlFor="upload">
				Add a photo
				<input
					type="file"
					id="upload"
					onChange={(event) => event.target.files && addPhoto(event.target.files[0])}
					multiple={false}
				/>
			</label>
			<div className="photos-container">
				{errorMessage.photos && <p>{errorMessage.photos}</p>}
				<Gallery photos={photos} action={removePhotoAtIndex} callToAction="Remove photo" />
			</div>
			<button type="button" onClick={saveAlbum}>Add album</button>
		</AlbumFormStyle>
	);
};

export default AlbumForm;
