// Import styles and icons
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import hooks
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

// Import components
import Inputs from "./Inputs";
import Button from "./Button";

// Import action and values
import { initialValues, validationSchema, onSubmit } from "../values";

const Container = styled.div`
  margin: 2rem;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;

  width: fit-content;
  align-items: center;
  border-radius: 20px;

  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  form {
    width: 100%;
  }
  
  ${respondTo.mobile`
    width:100vw;
    margin: 0rem;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.lowTablet`
    width:100vw;
    margin: 0rem;
    box-shadow:none;
    background:transparent;
  `}
`;

const Header = styled.h1`
  text-align: center;
  font-size: var(--medium-s);
  color: var(--color-primary);
`;

// Export table component
function Table({ t, id }) {
  // Initialize hooks
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>{t("images.add image")}</Header>

      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(e) => onSubmit(e, dispatch, id)}
      >
        {(formik) => {
          return (
            <Form className="w3-animate-right">
              <Inputs t={t} formik={formik} />
              <Button t={t} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Table;
