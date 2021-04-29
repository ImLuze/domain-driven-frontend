import { FunctionComponent } from 'react';
import AlbumCardStyle from './AlbumCardStyle';
import useAlbumCard, { AlbumCardProps } from './useAlbumCard';

/**
 * A Component is split up in 3 variables, wether these 3 variables
 * live in separate files or not is up to the developer.
 *
 * 1. The Layout (this file):
 *    This layer holds no logic, it simply determines the layout of the component and
 *    presents data and allows user events to be triggered.
 *
 * 2. The Styling (<name>Style.ts):
 *    Determines how a component looks.
 *
 * 3. The UI Logic (use<name>.ts):
 *    Determines which specific models and operations this component has access too and
 *    what happens if an operation gets called.
 */

const AlbumCard: FunctionComponent<AlbumCardProps> = (props) => {
  const { models, operations } = useAlbumCard(props);
  const {
    title, username, url, isEditing, errorMessage,
  } = models;
  const { setTitle, setIsEditing } = operations;

  return (
    <AlbumCardStyle>
      {errorMessage && <p>{errorMessage}</p>}
      {isEditing
        ? <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        : (
          <div className="header">
            <h2>{title}</h2>
            <button type="button" onClick={() => setIsEditing(true)}>edit title</button>
          </div>
        )}
      <p>{username}</p>
      <a href={url}>Go to album</a>
    </AlbumCardStyle>
  );
};

export default AlbumCard;
