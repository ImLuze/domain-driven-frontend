import React from 'react';
import { Link } from 'react-router-dom';
import AlbumForm from '../../components/albumForm/AlbumForm';
import useAlbumsOperations from '../../hooks/albums/useAlbumsOperations';
import { PageComponent } from '../../models/PageComponent';
import AddAlbumPageStyle from './AddAlbumPageStyle';

const AddAlbumPage: PageComponent = () => {
  const { createAlbum, validatePhotos, validateTitle } = useAlbumsOperations();

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
