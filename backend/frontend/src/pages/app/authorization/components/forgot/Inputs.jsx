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

// Export forgot password inputs
function Inputs(props) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="email"
        label="Email"
        name="email"
        placeholder={props.t("register.email")}
      />
    </Container>
  );
}

export default Inputs;
