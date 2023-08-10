// Import styled components css
import { css } from "styled-components";

// Breaks for media query
const customBreakpoints = [
  { label: "mobile", breakPoint: "0px" },
  { label: "lowTablet", breakPoint: "480px" },
  { label: "tablet", breakPoint: "767px" },
  { label: "laptop", breakPoint: "1024px" },
  { label: "desktop", breakPoint: "1280px" },
  { label: "tv", breakPoint: "1920px" },
];

// Custom media query
export const respondTo = customBreakpoints.reduce(
  (accumulator, device, index) => {
    const minWidth = parseInt(device.breakPoint, 10) + 1 + "px";
    const maxWidth =
      index + 1 === customBreakpoints.length
        ? "10000px"
        : customBreakpoints[index + 1].breakPoint;
    accumulator[device.label] = (...args) => css`
      @media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
        ${args[0][0]};
      }
    `;
    return accumulator;
  },
  {}
);
