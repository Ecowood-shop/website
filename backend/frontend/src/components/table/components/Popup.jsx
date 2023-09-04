// import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";

// import hooks
import { useTranslation } from "react-i18next";

const Container = styled.div`
  top: 0;
  left: 0;
  z-index: 10;

  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const InnerContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 90vw;

  padding: 1rem 3rem;
  align-items: center;
  justify-content: center;

  color: var(--white);
  border-radius: 20px;

  background-image: var(--linear-primary);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;

const Header = styled.h2`
  margin: 1rem;
  text-align: center;
  font-size: calc(var(--medium-s) - 0.1rem);
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  width: max-content;
  padding: 0.5rem 2rem;

  border: none;
  border-radius: 20px;

  color: var(--white);
  font-size: var(--small-l);
  background-color: darkmagenta;
  transition: color 0.1s ease-in-out;

  &:last-of-type {
    background-color: var(--color-primary);
  }
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

// export popup component
function Popup({ text, popper, Delete }) {
  // initialize hook
  const { t } = useTranslation(["components"]);

  const clicker = (success) => {
    if (success) {
      Delete();
    }
    popper();
  };
  return (
    <Container>
      <InnerContainer>
        <Header>{text}</Header>
        <TextContainer>
          <Button onClick={() => clicker("success")}> {t("popup.yes")}</Button>
          <Button onClick={() => clicker()}> {t("popup.no")}</Button>
        </TextContainer>
      </InnerContainer>
    </Container>
  );
}

export default Popup;
