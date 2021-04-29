import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component.
 * Placing the component on the correct spot is the concern of the Page Component.
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
