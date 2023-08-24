// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
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

// Export inputs component
function Inputs({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        placeholder={t("resetPassword.password")}
      />
      <FormikControl
        control="input"
        type="password"
        label="confirm_password"
        name="confirm_password"
        placeholder={t("resetPassword.confirm password")}
      />
    </Container>
  );
}

export default Inputs;
