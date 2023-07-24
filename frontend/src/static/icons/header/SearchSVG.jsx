// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export search svg
const SearchSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </SVG>
  );
};

export default SearchSVG;
