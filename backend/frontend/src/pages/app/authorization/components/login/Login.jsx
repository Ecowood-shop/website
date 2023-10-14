// Import styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../../../static/icons/components";
// Import hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import components
import Inputs from "./Inputs";
import { Formik, Form } from "formik";
import Button from "./Buttons";
// Import values and actions
import { reset } from "../../../../../toolkit/user/userSlice";
import { initialValues, validationSchema, onSubmit } from "./values";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--white);
  font-size: var(--medium-m);
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: var(--white);
  font-size: var(--small-l);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

// Export login component
function Login({ t, i18n, pageChanger }) {
  // Initialize hooks
  const dispatch = useDispatch();

  // Get user from user slice
  const { isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <Container className="w3-animate-left">
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(e) => onSubmit(e, i18n.language, dispatch)}
      >
        {(formik) => {
          return (
            <Form className="w3-animate-left">
              {/* Header text */}
              <HeaderText>{t("register.log in")}</HeaderText>

              {/* Display login error */}
              {error && !isLoading && (
                <ErrorContainer>
                  <IconContainer>
                    <ErrorSVG />
                  </IconContainer>
                  {error}
                </ErrorContainer>
              )}

              {/* Form Inputs */}
              <Inputs t={t} />

              <Button t={t} pageChanger={pageChanger} isLoading={isLoading} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Login;
