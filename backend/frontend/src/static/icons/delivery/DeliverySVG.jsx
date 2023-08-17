// Import styled component
import styled from "styled-components";

// Styled svg
const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

// Export delivery svg
const DeliverySVG = () => {
  return (
    <SVG
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <style>
        {
          ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
        }
      </style>
      <path className="st0" d="M2 9L19 9 19 24 10 24" />
      <circle className="st0" cx={24} cy={24} r={2} />
      <circle className="st0" cx={8} cy={24} r={2} />
      <path className="st0" d="M19 24L19 13 25 13 29 18 29 24 26 24" />
      <path className="st0" d="M4 13L13 13" />
      <path className="st0" d="M2 17L11 17" />
      <path fill="none" d="M-288 -432H248V248H-288z" />{" "}
    </SVG>
  );
};

export default DeliverySVG;
