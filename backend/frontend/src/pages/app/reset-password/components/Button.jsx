// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;
`;
const Btn = styled.button`
  cursor: pointer;
  margin-left: auto;

  border: none;
  border-radius: 20px;
  padding: 0.5rem 2rem;

  color: var(--white);
  font-size: var(--small-l);
  background-color: var(--color-primary);
  transition: color 0.1s ease-in-out;

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
      <Btn type="submit">{t("resetPassword.submit")}</Btn>
    </Container>
  );
}

export default Button;
