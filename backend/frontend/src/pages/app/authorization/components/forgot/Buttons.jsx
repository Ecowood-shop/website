// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;

  ${respondTo.mobile`
    width:80vw;
    flex-direction:column;
    align-items:center;
  `}
`;

const LoginContainer = styled.div`
  cursor: pointer;
  height: min-content;
  padding: 0.5rem 1rem;

  color: white;
  font-size: var(--small-l);
  text-transform: capitalize;

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

  ${respondTo.mobile`
    order:2;
  `}
`;

const Btn = styled.button`
  cursor: pointer;
  margin-left: auto;
  padding: 0.5rem 3rem;
  margin-bottom: 0.5rem;

  border: none;
  border-radius: 20px;
  background-color: darkmagenta;

  color: white;
  font-size: var(--small-l);
  transition: color 0.1s ease-in;

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

  ${respondTo.mobile`
    width:100%;
    margin-left:0;
  `}
`;

function Buttons({ t, pageChanger, isLoading }) {
  return (
    <Container>
      {/* Change container to log in */}
      <LoginContainer type="button" onClick={() => pageChanger("login")}>
        {t("register.log in")}
      </LoginContainer>

      {/* Right button  */}
      <Btn type="submit" disabled={isLoading}>
        {t("register.send")}
      </Btn>
    </Container>
  );
}

export default Buttons;