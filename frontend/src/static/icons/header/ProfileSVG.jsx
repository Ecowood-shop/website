// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export profile svg
const ProfileSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      className="custom-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </SVG>
  );
};

export default ProfileSVG;
