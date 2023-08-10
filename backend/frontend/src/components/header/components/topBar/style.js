// Import styled component
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Export main container
export const Container = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  background-image: var(--gradient-secondary);
`;


export const InnerContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  padding: 8px 10%;
  justify-content: space-evenly;

  color: white;

  ${respondTo.tv`
    padding: 8px 0;
    max-width: 1400px;
  `}
`;

// Export link
export const Link = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;

  text-transform: ${(props) => (props.$lowercase ? "lowercase" : "capitalize")};
  font-size: var(--small-m);
  transition: all 0.1s ease-in-out;
  p {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
  &:hover {
    color: ${(props) =>
      props.$translate ? "var(--white)" : "var(--whiteWithOpacity)"};
    svg {
      fill: var(--whiteWithOpacity);
    }
  }
  svg {
    transition: fill 0.1s ease-in-out;
    height: 16px;
    width: 16px;
    margin-right: 10px;
  }
`;

// Export language
export const Language = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px 5px 15px;
  transition: all 0.1s ease-in-out;
  text-transform: uppercase;
  height: 100%;
  &:last-of-type {
    padding-bottom: 10px;
  }
  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

// Export icon container
export const IconContainer = styled.div`
  display: flex;
  margin-bottom: 1px;
  svg {
    height: 24px;
    width: 24px;
  }
`;
