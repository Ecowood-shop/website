// Import create global styles
import { createGlobalStyle } from "styled-components";
import { respondTo } from "../utils/styles/_respondTo";
// Import styles
import {
  FontSize,
  SVGStyles,
  TextStyles,
  InputStyles,
  FontFamilies,
  ButtonStyles,
  DefaultStyles,
} from "./styles";

// Export Global styles
const GlobalStyle = createGlobalStyle`

${FontFamilies}
${DefaultStyles}

${TextStyles}
${SVGStyles}
${InputStyles}
${ButtonStyles}

/* On touch devices cursor should not be pointer */
${respondTo.mobile`
  & * 
  {
    cursor:default !important;
  }
`}

${respondTo.lowTablet`
  & * 
  {
    cursor:default !important;
  }
`}

${respondTo.tablet`
  & * 
  {
    cursor:default !important;
  }
`}

${respondTo.laptop`
  & * 
  {
    cursor:default !important;
  }
`}


/* Variables */
:root {


  /* Colors */
  --color-primary: #9c36b5;
  --color-magenta: darkmagenta;
  --color-second: #a4508b;
  --color-error: #d31027;
  --color-black: rgb(11, 11, 11);
  --linear-primary: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
  --linear-second: linear-gradient(to right, #ea384d, #d31027);


  --gradient-primary: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
  --gradient-secondary:linear-gradient(336deg, #a4508b 0%, darkmagenta 74%);
  --secondary: #a4508b;

  --red: rgb(211,16,39);
  --redWithOpacity:rgba(211,16,39,0.7);
  
  --black: rgb(11, 11, 11);
  --blackWithOpacity: rgba(11, 11, 11, 0.7);

  --white: white;
  --whiteWithOpacity: rgba(255, 255, 255, 0.7);
  --darkmagenta:darkmagenta;

  /* Font size */
  --xx-medium: 1.8rem;
  --x-medium: 1.6rem;
  --medium: 1.4rem;
  --small: 1.2rem;
  --x-small: 1rem;
  --xx-large: 3rem;
  --x-large: 2.5rem;

  /* Min height */

${FontSize}
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;

export default GlobalStyle;
