import styled from 'styled-components';
import AlbumFormStyle from '../../components/albumForm/AlbumFormStyle';
import { Layout } from '../../style/layout';

const AddAlbumPageStyle = styled(Layout)`
  grid-template-areas:
    '. header .'
    '. form   .';

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${AlbumFormStyle} {
    grid-area: form;
  }
`;

export default AddAlbumPageStyle;
