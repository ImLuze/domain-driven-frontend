import styled from 'styled-components';

/**
 * This is component specific styling. It makes sure that the component looks good in any instance.
 * It does not position the component. Placing the component on the correct spot is the concern of
 * the Page Component.
 *
 * If you need a component to be fully responsive, this is where you do it. Let the Page decide the
 * actual size of the component.
*/

const LoaderStyle = styled.div`
	display: contents;
`;

export default LoaderStyle;
