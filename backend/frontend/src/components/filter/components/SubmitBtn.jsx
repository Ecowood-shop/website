// Import styles
import styled from "styled-components";
import { headerIcons } from "../../../static/icons";
import { respondTo } from "../../../utils/styles/_respondTo";

// Main container
const Container = styled.button`
  cursor: pointer;
  height: 90%;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  border: none;
  border-radius: 50%;

  font-size: var(--small-m);
  background-color: var(--color-second);

  transition: color 0.1s ease-in-out;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.desktop`  
    &:hover{
        color:var(--whiteWithOpacity)
    }
    `}

  ${respondTo.tv`  
    &:hover{
        color:var(--whiteWithOpacity)
    }
    `}

  ${respondTo.mobile`
      top:50%;
      padding:0;
      right:1.5rem;
      position:absolute;
      height:fit-content;

      background:transparent;
      transform:translateY(-50%);
      
      svg{
        stroke:var(--darkmagenta);
      }
  `}

    ${respondTo.lowTablet`
      top:50%;
      padding:0;
      right:1.5rem;
      position:absolute;
      height:fit-content;

      background:transparent;
      transform:translateY(-50%);
      
      svg{
        stroke:var(--darkmagenta);
      }
  `}
`;

// Export submit button
function SubmitBtn() {
  // Destructure icons
  const { SearchSVG } = headerIcons;

  return (
    <Container type="submit">
      <SearchSVG />
    </Container>
  );
}

export default SubmitBtn;
