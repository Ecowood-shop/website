// Import styled component
import styled from "styled-components";
import { respondTo } from "../../utils/styles/_respondTo";

export const GridContainer = styled.div`
  gap: 4vw;
  display: grid;
  max-width: 1400px;
  grid-auto-rows: 1;

  // Desktop
  grid-template-columns: repeat(4, 1fr);

  // Leptop
  ${respondTo.laptop`
    grid-template-columns: repeat(3,1fr);
  `}

  // Tablet
  ${respondTo.tablet`
    grid-template-columns: repeat(2,1fr);
  `}

  // Low tablets
  ${respondTo.lowTablet`
    row-gap:0rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    
    & > div:nth-child(1) {
        grid-area: 1 / 1 / 2 / 2;
    }
    & > div:nth-child(2) {
        grid-area: 1 / 2 / 2 / 3;
    }
    & > div:nth-child(3) {
        grid-area: 2 / 1 / 3 / 2;
    }
    & > div:nth-child(4) {
        grid-area: 3 / 1 / 4 / 2;
    }
  `}

  // Mobile
  ${respondTo.mobile`
    row-gap:0rem;
    column-gap:3.125rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    
    & > div:nth-child(1) {
        grid-area: 1 / 1;
    }
    & > div:nth-child(2) {
        grid-area: 1 / 2 ;
    }
    & > div:nth-child(3) {
        grid-area: 2 / span 2 ;
    }
    & > div:nth-child(4) {
        grid-area: 3 / span 2;
    }
  `}
`;

// Column
export const Column = styled.div`
  display: flex;
  align-items: center;
  align-items: start;
  color: var(--white);
`;

// Header
export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--medium-s);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.7rem;
  svg {
    transform: rotateZ(100deg) skewY(10deg) skewX(10deg);
    height: 1.25rem;
    width: 1.25rem;
    path {
      fill: var(--color-primary);
    }
    ${respondTo.desktop`
        height: 1.5rem;
        width: 1.5rem;
    `}

    ${respondTo.tv`
        height: 1.5rem;
        width: 1.5rem;
    `}
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
// Item
export const Item = styled.div`
  cursor: pointer;

  display: flex;
  gap: 0.3125rem;
  align-items: center;

  font-size: var(--small-l);
  text-transform: capitalize;
  transition: color 0.1s ease-in-out;

  a {
    cursor: pointer;

    display: flex;
    gap: 0.3125rem;
    align-items: center;
    justify-content: center;

    text-decoration: none;
  }
  svg {
    height: 1.25rem;
    width: 1.25rem;
    ${(props) => props.$small && "height:1.125rem;width:1.125rem;"}
    transition: color 0.1s ease-in-out;
  }
  iframe {
    border: none;
    border-radius: 0.625rem;
  }

  ${respondTo.desktop`
    &:hover {
      color: var(--whiteWithOpacity);
    
      svg {
        fill: var(--whiteWithOpacity);
      }
    }
  `}

  ${respondTo.tv`
    &:hover {
      color: var(--whiteWithOpacity);
    
      svg {
        fill: var(--whiteWithOpacity);
      }
    }
  `}
`;

// CopyRight Container
export const CopyRightContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 3rem 0;
  text-align: center;

  border-radius: 0.625rem;
  color: var(--white);
  font-size: var(--small-l);
  background-color: var(--color-primary);
`;
