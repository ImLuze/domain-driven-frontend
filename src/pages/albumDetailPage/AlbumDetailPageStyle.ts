import styled from 'styled-components';
import { Layout } from '../../style/layout';

/**
 * This component handles "positional" styling for the page.
 * This file decide where each component should be rendered and handles
 * all the styling which is specific to this page.
 * The base wrapper for the content of the page is enforced by the Layout.
 *
 * CSS-grid is a great tool to position all the individual elements on the correct spot.
*/

const AlbumDetailPageStyle = styled(Layout)`
	display: grid;
	grid-template-areas:
		'. header .'
		'. author .'
		'. photos .';

	.header {
		grid-area: header;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.author {
		grid-area: author;
	}

	.photos {
		grid-area: photos;
	}
`;

export default AlbumDetailPageStyle;
