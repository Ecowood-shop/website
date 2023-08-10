// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export minus svg
const MinusSVG = () => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </SVG>
  );
};

export default MinusSVG;
