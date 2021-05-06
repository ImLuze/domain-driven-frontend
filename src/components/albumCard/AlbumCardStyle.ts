import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component. Placing the component on the correct spot is the concern of
 * the Page Component.
 *
 * If you need a component to be fully responsive, this is where you do it. Let the Page decide the
 * actual size of the component.
*/

const AlbumCardStyle = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #333;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default AlbumCardStyle;
