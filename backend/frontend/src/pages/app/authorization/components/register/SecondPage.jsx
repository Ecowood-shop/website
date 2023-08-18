// Import styles
import { styled } from "styled-components";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

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
  }
`;

// Export register second page inputs
function SecondPage({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        className="w3-animate-right"
        placeholder={t("register.phone")}
      />
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        className="w3-animate-right"
        placeholder={t("register.password")}
      />
      <FormikControl
        control="input"
        type="password"
        label="confirmPassword"
        name="confirmPassword"
        className="w3-animate-right"
        placeholder={t("register.confirm password")}
      />
    </Container>
  );
}

export default SecondPage;
