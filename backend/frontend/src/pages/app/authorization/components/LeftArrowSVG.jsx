// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 36px;
  width: 36px;
`;

// Export left arrow svg for block carousel
const LeftArrowSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </SVG>
  );
};

export default LeftArrowSVG;
