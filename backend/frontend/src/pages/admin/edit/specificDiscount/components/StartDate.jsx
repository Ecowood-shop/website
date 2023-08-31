// Import styles
import { styled } from "styled-components";

// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  gap: 1rem;
  width: 30rem;
  display: flex;
  max-width: 80vw;

  align-items: start;
  justify-content: center;

  & > div {
    max-width: 10rem !important;
    width: max-content !important;
  }

  & input {
    width: max-content !important;
    font-size: var(--small-l) !important;
    max-width: 10rem !important;
  }
`;

function StartDate() {
  return (
    <Container>
      <FormikControl control="date" name="start_date" />
      <FormikControl control="input" type="time" name="start_time" />
    </Container>
  );
}

export default StartDate;
