// Import styled components and svgs
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Main container
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;

  width: 100%;
  background-image: var(--gradient-secondary);

  ${respondTo.desktop`
    background-image:none;
    width:fit-content;
  `}

  ${respondTo.tv`
    background-image:none;
    width:fit-content;
  `}

  form {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px;
  }
  svg {
    cursor: pointer;
  }
`;

// Inner container
export const InnerContainer = styled.div`
  // Self positon
  align-self: center;
  position: absolute;

  // Content position
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  // Styles
  font-size: var(--small-m);
  font-weight: bold;
  text-transform: capitalize;
  // Select
  ${respondTo.mobile`
    & > div{
      display:none
    }
  `}
  ${respondTo.lowTablet`
    & > div{
      display:none
    }
  `}
  & div {
    color: var(--color-primary) !important;
  }
  & > div:first-child > div:first-of-type {
    // Content position
    width: 200px;
    padding-left: 1rem;

    // Border style
    border-radius: 100px !important;
    border: 2px solid var(--color-primary);
  }
  & div:last-child {
    border-radius: 20px !important;
  }
`;

// Submit button with SearchSVG
export const SubmitBtn = styled.button`
  // Content position
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin-left: 10px;

  // Styles
  border: none;
  border-radius: 50%;
  background-color: var(--color-primary);
`;

// Cart
export const Cart = styled.div`
  display: none;
  align-items: center;
  justify-content: center;

  ${respondTo.desktop`
    display: flex;
  `}

  ${respondTo.tv`
    display: flex;
  `}
`;
