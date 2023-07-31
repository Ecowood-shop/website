// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Altax text
export const AltaxText = styled.h1`
  // Styles
  color: var(--white);
  margin-left: 1vw;
  font-size: var(--large);
`;

// Header component
export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// SideBar close icon container
export const CloseIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--white);
  border-radius: 50%;
  padding: 1px;
  svg {
    height: 1.875rem;
    width: 1.875rem;
    ${respondTo.mobile`
      height:1.625rem;
      width:1.625rem ;
    `}
    fill: var(--darkmagenta);
  }
`;

// Auth text container
export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--white);
  font-size: var(--medium-s);
  text-transform: capitalize;
  margin: auto 5% 10% auto;
`;

// Dropdown component
export const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 1.25rem;
  gap: 0.625rem;
  border-top: 1px solid white;
`;

// Dropdown item component
export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--white);
  text-transform: capitalize;
  width: 100%;
  font-size: var(--medium-s);

  ${(props) => props.$left && "align-self:start;"}
  a {
    cursor: default;
    text-decoration: none;
  }
`;

// Icon container
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
  svg {
    height: 1.875rem;
    width: 1.875rem;
    ${respondTo.mobile`
      height:1.625rem;
      width:1.625rem;
    `}
  }
`;

// Arrow Icon container
export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  svg {
     height: 1.875rem;
    width: 1.875rem;
    ${respondTo.mobile`
      height:1.625rem;
      width:1.625rem;
    `}
  }
`;