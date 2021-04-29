import styled from 'styled-components';
import { Layout } from '../../style/layout';
import AlbumsSectionStyle from './components/albumsSection/AlbumsSectionStyle';

/**
 * This component handles "positional" styling for the Albums page.
 * This file decide where each component should be rendered and handles
 * all the styling which is specific to this page.
 * The base wrapper for the content of the page is enforced by the Layout.
 *
 * WORKFLOW:
 * 1. Create a page-specific grid using CSS-grid.
 * 2. Name each section on the grid using grid-template-areas.
 * 3. Position each component/section correctly using a combination of
 *    positional css properties like css-grid, flex, margin etc.
*/

export default styled(Layout)`
  grid-template-areas:
    '. header  .'
    '. albums .';

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${AlbumsSectionStyle} {
    grid-area: albums;
  }
`;
