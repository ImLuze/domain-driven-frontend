import styled from 'styled-components';

/**
* This is the base layout for every page component.
* It enforces a consistent wrapper for the content of each page.
*/

export const MOBILE_WIDTH = '850px';

export const Layout = styled.main`
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1280px 1fr;

    @media (max-width: ${MOBILE_WIDTH}) {
        grid-template-columns: 8px 1fr 8px;
    }
`;
