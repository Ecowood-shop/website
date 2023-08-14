// Import styles
import { styled } from "styled-components";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
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

// Export register first page inputs
function FirstPage({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="text"
        label="first_name"
        name="first_name"
        className="w3-animate-left"
        placeholder={t("register.first name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="last_name"
        name="last_name"
        className="w3-animate-left"
        placeholder={t("register.last name")}
      />
      <FormikControl
        control="input"
        type="email"
        label="email"
        name="email"
        className="w3-animate-left"
        placeholder={t("register.email")}
      />
    </Container>
  );
}

export default FirstPage;
