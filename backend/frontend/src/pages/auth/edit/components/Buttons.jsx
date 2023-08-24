// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 30rem;
  max-width: 80vw;

  & > div {
    margin: 1rem 0;
  }
  input {
    width: 30rem;
    max-width: 80vw;
    padding: 0.5rem 2rem;

    border-radius: 20px;
    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: var(--small-l);
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${respondTo.mobile`
    flex-direction:column;
  `}

  ${respondTo.lowTablet`
    flex-direction:column;
  `}
`;

const TextButton = styled.p`
  cursor: pointer;

  color: darkmagenta;
  font-size: var(--small-l);
  text-transform: uppercase;
  transition: color 0.1s ease-in-out;

  ${respondTo.mobile`
    order:2;
    text-align:center;
    margin-top:0.5rem;
  `}

  ${respondTo.lowTablet`
    order:2;
    text-align:center;
    margin-top:0.5rem;
  `}


  ${respondTo.desktop`
    &:hover {
        color: rgba(139, 0, 139, 0.7);
    }
  `}

  ${respondTo.tv`
    &:hover {
      color: rgba(139, 0, 139, 0.7);
    }
  `}
`;

const Button = styled.button`
  cursor: pointer;

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

// Export buttons component
function Buttons({ t, isFirstPage, setIsFirstPage }) {
  return (
    <Container>
      <InputContainer>
        <Text>{t("edit profile.current password")}</Text>
        <FormikControl
          control="input"
          type="password"
          label="password"
          name="password"
          placeholder={t("edit profile.current password")}
        />
      </InputContainer>

      <ButtonContainer>
        <TextButton onClick={() => setIsFirstPage(!isFirstPage)}>
          {isFirstPage
            ? t("edit profile.change password")
            : t("edit profile.edit profile")}
        </TextButton>

        <Button type="submit">{t("global.submit")}</Button>
      </ButtonContainer>
    </Container>
  );
}

export default Buttons;
