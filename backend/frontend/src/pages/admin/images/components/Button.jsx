// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;

  ${respondTo.lowTablet`
    align-items:center;
  `}
`;

const StyledButton = styled.button`
  cursor: pointer;
  margin-left: auto;
  width: max-content;
  padding: 0.5rem 2rem;

  border: none;
  border-radius: 20px;

  color: var(--white);
  font-size: var(--small-l);
  background-color: var(--color-primary);
  transition: color 0.1s ease-in-out;

  ${respondTo.lowTablet`
    margin-left:0;
  `}

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}
`;

// Export button component
function Button({ t }) {
  return (
    <Container>
      <StyledButton type="submit">{t("global.add")}</StyledButton>
    </Container>
  );
}

export default Button;
