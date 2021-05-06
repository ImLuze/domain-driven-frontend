import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component. Placing the component on the correct spot is the concern of
 * the Page Component.
 *
 * If you need a component to be fully responsive, this is where you do it. Let the Page decide the
 * actual size of the component.
*/

const GalleryStyle = styled.div`
  grid-area: photos;
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
      aspect-ratio: 1 / 1;
      border: 1px solid black;
      border-radius: 4px;
    }
  }

  .skeleton {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-color: lightgray;
  }
`;

export default GalleryStyle;
