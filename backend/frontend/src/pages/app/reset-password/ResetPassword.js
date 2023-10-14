// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Import components
import Form from "./components/Form";
import { LoaderMini, ErrorMessage } from "../../../components";

const Container = styled.div`
  margin: 10rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.lowTablet`
    box-shadow:none;
    background:transparent;
  `}
`;
const Header = styled.h1`
  font-size: var(--medium-s);
`;

const SuccessMessage = styled.p`
  min-width: max-content;
  color: var(--color-primary);
  font-size: var(--medium-s);

  &::first-letter {
    text-transform: capitalize;
  }
`;

const ErrorContainer = styled.div`
  * {
    margin: 0;
    stroke: var(--red);
    color: var(--red);
    background: transparent;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
// Export reset password page
function ResetPassword() {
  // Initialize hooks
  const { t, i18n } = useTranslation(["app"]);

  // Get success from state
  const resetPasswordSlice = useSelector((state) => state.resetPassword);
  const { error, isLoading, success } = resetPasswordSlice;

  return (
    <Container>
      {success ? (
        <SuccessMessage>{success}</SuccessMessage>
      ) : (
        <>
          <Header>{t("resetPassword.reset password")}</Header>
          {error && (
            <ErrorContainer>
              <ErrorMessage>{error}</ErrorMessage>
            </ErrorContainer>
          )}
          {isLoading ? (
            <LoaderMini color={"darkmagenta"} />
          ) : (
            <Form t={t} i18n={i18n} />
          )}
        </>
      )}
    </Container>
  );
}

export default ResetPassword;
