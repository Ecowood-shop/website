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

const RegisterContainer = styled.div`
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

const BtnContainer = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  ${respondTo.mobile`
    width:100%;
    margin-left:0;
  `}
`;

const Btn = styled.button`
  cursor: pointer;
  padding: 0.5rem 3rem;
  margin-bottom: 0.5rem;
  min-width: 100%;
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
`;

const TextContainer = styled.p`
  cursor: pointer;
  color: var(--black);
  font-size: var(--small-m);
  text-transform: capitalize;
  transition: color 0.1s ease-in;

  ${respondTo.desktop`
    &:hover{
      color:var(--blackWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--blackWithOpacity);
    }
  `}
`;

// Export login page button component
function Button({ t, pageChanger, isLoading }) {
  return (
    <Container>
      {/* Change container to register */}
      <RegisterContainer type="button" onClick={() => pageChanger("register")}>
        {t("global.register")}
      </RegisterContainer>

      {/* Right button  */}
      <BtnContainer>
        <Btn type="submit" disabled={isLoading}>
          {t("register.log in2")}
        </Btn>

        {/* Change container to forgot password page */}
        <TextContainer onClick={() => pageChanger("forgot")}>
          {t("register.forgot password")}
        </TextContainer>
      </BtnContainer>
    </Container>
  );
}

export default Button;
