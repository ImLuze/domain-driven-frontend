import { FunctionComponent } from 'react';
import useAlbums from '../../hooks/albums/useAlbums';
import AlbumsPageStyle from './AlbumsPageStyle';
import AlbumsSection from './components/albumsSection/AlbumsSection';
import { useGetAlbums } from './models/getAlbums';

/**
 * This is our Page Component (also known as Container Component).
 * It glues our `Interaction` layer (useAlbums hook) to our `View` layer (React Components).
 * It delegates user events triggered by the React Components back to the interaction layer.
 *
 * (Note: These Page Components generally don't have any logic of their own.)
*/

const AlbumsPage: FunctionComponent = () => {
  const { operations, models } = useAlbums(useGetAlbums());
  const { updateAlbum, validateTitle } = operations;
  const { albums, isLoading, error } = models;

  return (
    <AlbumsPageStyle>
      <header className="header">
        <h1>Albums Page</h1>
        <a href="/albums/add">Add new album</a>
      </header>
      <AlbumsSection
        albums={albums}
        isLoading={isLoading}
        hasError={!!error}
        operations={{
          updateAlbum,
          validateTitle,
        }}
      />
    </AlbumsPageStyle>
  );
};

export default AlbumsPage;
