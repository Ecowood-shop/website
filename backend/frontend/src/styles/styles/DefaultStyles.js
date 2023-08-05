// Import background image
import BackgroundImage from "./../../static/images/background.png";

// Export default styles
export const DefaultStyles = `

* {  
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root {  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: calc(var(--height) + 31.25rem);
  background-color: whitesmoke;
  font-family: "BPG Arial Caps", sans-serif !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  color: var(--color-black);
  width:100vw;
}
`;
