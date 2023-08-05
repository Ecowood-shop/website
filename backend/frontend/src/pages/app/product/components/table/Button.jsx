// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 0;
  border: none;
  border-radius: 100px;

  color: var(--white);
  font-size: var(--small-l);
  background-image: var(--linear-primary);
  transition: color 1ms ease-in-out;

  ${respondTo.desktop`
    cursor:pointer;
    
    &:hover{
        color:var(--whiteWithOpacity);
    }
  `}
`;

// Export button component
function Button({ t }) {
  return <Container type="submit"> {t("product.add")}</Container>;
}

export default Button;
