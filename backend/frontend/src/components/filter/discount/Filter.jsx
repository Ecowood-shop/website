// Import styles
import styled from "styled-components";
// Import components
import FilterPanel from "../components/FilterPanel";
import SelectPanel from "../components/SelectPanel";
// Import formik configuration
import { Formik, Form } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { initialValues, validationSchema, onSubmit } from "./values";

// Container which contains form
const Container = styled.div`
  form {
    display: flex;
    @media screen and (max-width: 1600px) {
      flex-direction: column;
    }
  }
`;

// Export order filter
function Filter() {
  // Initializing hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get query params
  const word = searchParams.get("word");

  const values = { word };

  return (
    <Container className="w3-animate-right">
      <Formik
        initialValues={initialValues(values)}
        validationSchema={validationSchema}
        onSubmit={(e) => onSubmit(e, navigate)}
      >
        {() => {
          return (
            <Form>
              <FilterPanel />
              <SelectPanel />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
export default Filter;
