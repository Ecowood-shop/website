// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export ecowood svg
const EcowoodSVG = () => {
  return (
    <SVG viewBox="0 0 64 64">
      <g data-name="HOUSE">
        <path d="M25.21 17v14H48L28.09 7.49 20.27 16h4a1 1 0 01.94 1z" />
        <path d="M12.61 24H19.4V42H12.61z" />
        <path d="M59.75 51v-1.19a3.6 3.6 0 002.86-3.52c0-.1-.84-10-3.61-10s-3.61 9.94-3.61 10a3.6 3.6 0 002.86 3.52V51h-9.77V33H34.91v18H33V33h-7.79v18h-1.94V18H5.82v33H0v2h64v-2zm-38.42 0h-1.94v-7h-6.78v7h-1.94V23a1 1 0 011-1h8.72a1 1 0 011 1z" />
      </g>
    </SVG>
  );
};

export default EcowoodSVG;
