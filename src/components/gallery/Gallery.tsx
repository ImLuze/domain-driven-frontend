import { FunctionComponent } from 'react';
import { Photo } from '../../hooks/albums/models/album';
import GalleryStyle from './GalleryStyle';

/**
 * This is the Layout of the component. The components in this `components` directory are supposed
 * to fully reusable and are usually used on multiple pages. If you prefer, you could also merge the
 * style file into this one as they are both part of the Presentation layer. If the Layout changes,
 * usually the styling changes with it.
 */

interface GalleryProps {
	isLoading?: boolean;
	photos: Pick<Photo, 'alt' | 'url'>[];
	action?: (index: number) => void;
	callToAction?: string;
}

const Gallery: FunctionComponent<GalleryProps> = ({
	photos, action, callToAction, isLoading,
}) => {
	const renderSkeletonPhoto = (): JSX.Element => (
		<div className="skeleton photo" />
	);

	const renderPhoto = (photo: GalleryProps['photos'][number], index: number): JSX.Element => (
		<div className="photo">
			<img src={photo.url} alt={photo.alt} />
			{action && <button type="button" onClick={() => action(index)}>{callToAction}</button>}
		</div>
	);

	return (
		<GalleryStyle>
			{isLoading && [0, 1, 2, 3, 4, 5, 6].map(renderSkeletonPhoto)}
			{photos.map(renderPhoto)}
		</GalleryStyle>
	);
};

export default Gallery;
