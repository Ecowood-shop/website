// Import create global styles
import { createGlobalStyle } from "styled-components";
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
  --white: white;
  --whiteWithOpacity:rgba(255, 255, 255, 0.7);
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
  --height: 100vh;

${FontSize}
}

div{
    @include responsive(mobile) {
        border: 3px solid #b28451;
        background-color:red !important;
        color:red !important
    }
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;

export default GlobalStyle;
