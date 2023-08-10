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
  position:relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: whitesmoke;
  font-family: "BPG Arial Caps", sans-serif !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  color: var(--color-black);
  width:100vw;
  overflow-x:hidden;
  min-height:1400px;
  @media screen and (max-height:1600px){
    min-height:100vh;
  }
}
`;
