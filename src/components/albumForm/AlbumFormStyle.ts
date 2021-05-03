import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component.
 * Placing the component on the correct spot is the concern of the Page Component.
*/

const AlbumFormStyle = styled.form`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr auto 1fr;
  grid-template-areas:
    'title-input',
    'add-photo-input',
    'photos-error'
    'photos',
    'submit-button';
  row-gap: 24px;

  .title-input {
    width: 100%;

    input {
      width: 100%;
    }
  }

  .photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 24px;
    row-gap: 24px;

    .photo {
      display: grid;
      grid-auto-flow: row;
      row-gap: 16px;
      width: 100%;

      img {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        border: 1px solid black;
        border-radius: 4px;
      }
    }
  }
`;

export default AlbumFormStyle;
