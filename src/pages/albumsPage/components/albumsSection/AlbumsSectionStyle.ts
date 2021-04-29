import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component.
 * Placing the component on the correct spot is the concern of the Page Component.
*/

const AlbumsSectionStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
`;

export default AlbumsSectionStyle;
