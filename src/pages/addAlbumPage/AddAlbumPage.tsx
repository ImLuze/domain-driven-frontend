import { Link } from 'react-router-dom';
import AlbumForm from '../../components/albumForm/AlbumForm';
import useAlbums from '../../hooks/albums/useAlbums';
import { PageComponent } from '../../models/PageComponent';
import AddAlbumPageStyle from './AddAlbumPageStyle';

const AddAlbumPage: PageComponent = () => {
  const { operations } = useAlbums();
  const { createAlbum, validatePhotos, validateTitle } = operations;

  return (
    <AddAlbumPageStyle>
      <header className="header">
        <h1>Add new album</h1>
        <Link to="/">Go back</Link>
      </header>
      <AlbumForm
        operations={{
          onSubmit: createAlbum,
          validatePhotos,
          validateTitle,
        }}
      />
    </AddAlbumPageStyle>
  );
};
export default AddAlbumPage;
