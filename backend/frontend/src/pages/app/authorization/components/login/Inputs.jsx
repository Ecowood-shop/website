// Import styles
import { styled } from "styled-components";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  & > div:last-child {
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

// Export login inputs
function Inputs({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="email"
        label="Email"
        name="email"
        placeholder={t("register.email")}
        required
      />
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        placeholder={t("register.password")}
        required
      />
    </Container>
  );
}

export default Inputs;
