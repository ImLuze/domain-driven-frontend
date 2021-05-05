import { FunctionComponent } from 'react';
import { Photo } from '../../hooks/albums/models/album';
import GalleryStyle from './GalleryStyle';

/**
 * There are usually 2 reasons why someone would create a component:
 * 1. A piece of UI is reused on multiple occasions.
 * 2. Split up code to maintain readability/maintainability.
 *
 * This component exists for reason 1. It's a component that is designed to
 * be reused on multiple pages. These components live in the main `/components` folder.
 * These components have no dependencies outside their own except for types.
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
