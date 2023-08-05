// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export right arrow svg
const RightArrowSVG = () => {
  return (
    <SVG
      aria-hidden="true"
      data-prefix="fal"
      data-icon="arrow-alt-circle-right"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="svg-inline--fa fa-arrow-alt-circle-right fa-w-16 fa-7x"
    >
      <path
        fill="currentColor"
        d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm-32 88v64H120c-13.2 0-24 10.8-24 24v80c0 13.2 10.8 24 24 24h104v64c0 28.4 34.5 42.8 54.6 22.6l128-128c12.5-12.5 12.5-32.8 0-45.3l-128-128c-20.1-20-54.6-5.8-54.6 22.7zm160 128L256 384v-96H128v-64h128v-96l128 128z"
        class=""
      ></path>
    </SVG>
  );
};

export default RightArrowSVG;