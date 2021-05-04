import styled from 'styled-components';

/**
* This is the base layout for every page component.
* It enforces a consistent wrapper for the content of each page.
*/

export const MOBILE_WIDTH = '850px';

export const Layout = styled.main`
  display: grid;
  grid-template-columns: minmax(16px, 1fr) minmax(auto, 1280px) minmax(16px, 1fr);

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 8px 1fr 8px;
  }
`;
