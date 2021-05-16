import AlbumCard from '../../../../components/albumCard/AlbumCard';
import { AlbumCardProps } from '../../../../components/albumCard/useAlbumCard';
import Loader from '../../../../components/loader/Loader';
import { Album } from '../../../../hooks/albums/models/album';
import { UIComponent } from '../../../../models/component';
import AlbumsSectionStyle from './AlbumsSectionStyle';

/**
 * There are usually 2 reasons why someone would create a component:
 * 1. A piece of UI is reused on multiple occasions.
 * 2. Split up code to maintain readability/maintainability.
 *
 * This component exists for reason 2. It's a component that is only used on the AlbumsPage.
 * It's located in a `<page>/components` folder to indicate that. It could in theory easily
 * be added to the main Page Component, but sometimes it's more comprehensible to separate sections
 * All components in the main `/components` folder are reused on multiple pages.
 *
 * (Notice how the `AlbumsSectionStyle` component is actually a section and not a div. Having
 * semantically correct sections is a good indication that you can split them up in separate
 * components.)
 *
 * (Notice how this component is of the `UIComponent` type.)
 */

interface Operations {
	updateAlbum: AlbumCardProps['operations']['updateAlbum'];
	validateTitle: AlbumCardProps['operations']['validateTitle'];
}

interface Props {
	albums: Album[];
	isLoading: boolean;
	hasError: boolean;
	operations: Operations;
}

const AlbumsSection: UIComponent<Props> = ({
	albums, isLoading, hasError, operations,
}) => {
	const renderAlbumCard = (album: Album) => (
		<AlbumCard
			key={album.id}
			album={album}
			author={album.author}
			operations={operations}
		/>
	);

	return (
		<AlbumsSectionStyle>
			<Loader isLoading={isLoading}>
				{hasError
					? <p>Oops something went wrong!</p>
					: albums.map(renderAlbumCard)}
			</Loader>
		</AlbumsSectionStyle>
	);
};

export default AlbumsSection;
