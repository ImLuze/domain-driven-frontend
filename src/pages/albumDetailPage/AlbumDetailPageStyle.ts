import styled from 'styled-components';
import { Layout } from '../../style/layout';

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
