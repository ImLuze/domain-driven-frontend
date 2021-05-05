import { FunctionComponent } from 'react';
import LoaderStyle from './LoaderStyle';

/**
 * There are usually 2 reasons why someone would create a component:
 * 1. A piece of UI is reused on multiple occasions.
 * 2. Split up code to maintain readability/maintainability.
 *
 * This component exists for reason 1. It's a component that is designed to
 * be reused on multiple pages. These components live in the main `/components` folder.
 * These components have no dependencies outside their own except for types.
 */

interface Props {
	isLoading: boolean;
}

const Loader: FunctionComponent<Props> = ({ isLoading, children }) => (
	<LoaderStyle>
		{isLoading
			? <p>Loading...</p>
			: children}
	</LoaderStyle>
);

export default Loader;
