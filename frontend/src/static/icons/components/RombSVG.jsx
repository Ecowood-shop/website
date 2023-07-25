// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 36px;
  width: 36px;
`;

// Export branch svg
const RombSVG = () => {
  return (
    <SVG
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="svg-inline--fa fa-rectangle-landscape fa-w-16 fa-7x"
    >
      <path
        fill="var(--white)"
        d="M464 448H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48z"
      ></path>
    </SVG>
  );
};

export default RombSVG;
