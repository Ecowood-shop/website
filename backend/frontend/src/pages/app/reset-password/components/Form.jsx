// Import styles
import { styled } from "styled-components";
// Import hooks
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// Import components
import Inputs from "./Inputs";
import Button from "./Button";
import { Formik, Form as FormikForm } from "formik";
// Import actions and values
import { initialValues, validationSchema, onSubmit } from "../values";

const Container = styled.div`
  width: 100%;
`;
// Export form component
function Form({ t }) {
  // Initialize hooks
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(values) => onSubmit(values, dispatch, params)}
      >
        {(formik) => {
          return (
            <FormikForm>
              <Inputs t={t} />
              <Button t={t} />
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Form;
