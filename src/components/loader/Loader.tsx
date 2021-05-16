import { UIComponent } from '../../models/component';
import LoaderStyle from './LoaderStyle';

/**
 * This is the Layout of the component. The components in this `components` directory are supposed
 * to fully reusable and are usually used on multiple pages. If you prefer, you could also merge the
 * style file into this one as they are both part of the Presentation layer. If the Layout changes,
 * usually the styling changes with it.
 */

interface Props {
	isLoading: boolean;
}

const Loader: UIComponent<Props> = ({ isLoading, children }) => (
	<LoaderStyle>
		{isLoading
			? <p>Loading...</p>
			: children}
	</LoaderStyle>
);

export default Loader;
