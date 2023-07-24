// Import styled components
import styled, { keyframes } from "styled-components";

// Slide in right animation
const slideInRightAnimation = keyframes`
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Export link
export const Link = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
  width: max-content;
  padding: 15px;
  color: white;

  text-transform: capitalize;
  font-size: var(--small-l);
  border-top: ${(props) => (props.$borderBottom ? "1px solid white" : "none")};
  transition: all 0.1s ease-in-out;

  &:hover {
    color: var(--whiteWithOpacity);
    div {
      background-color: var(--secondary);
      svg {
        stroke: var(--whiteWithOpacity);
      }
    }
  }
`;

// Export svg container
export const SVGContainer = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    stroke: darkmagenta;
    height: 24px;
    width: 24px;
    margin: 0;
  }
`;

// Export user panel
export const UserPanel = styled.div`
  // Self position
  z-index: 1;
  display: flex;
  position: absolute;
  flex-direction: column;

  left: 50%;
  transform: translateX(-50%);

  // Styles
  min-width: 100%;
  border-radius: 10px;
  background-color: var(--secondary);
  animation: ${slideInRightAnimation} 0.5s ease-out;
`;

// Export user profile text component
export const UserText = styled.h2`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  gap: 5px;
  color: white;
  font-size: var(--small-l);
  transition: color 0.1s ease-in-out;

  &:hover {
    color: var(--whiteWithOpacity);
    svg {
      stroke: var(--whiteWithOpacity);
    }
  }
`;
