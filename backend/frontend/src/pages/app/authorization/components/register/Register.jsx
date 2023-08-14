// Import styles
import { styled } from "styled-components";
// Import hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import components
import Body from "./Body";
import { LoaderMini } from "../../../../../components";
import { Formik, Form } from "formik";
// Import actions and values
import { reset } from "../.././../../../toolkit/auth/registerSlice";
import { initialValues, validationSchema, onSubmit } from "./values";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    position: static;
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    min-height: 20rem;

    ${respondTo.mobile`
      min-width:auto;
    `}

    ${respondTo.lowTablet`
      min-width:auto;
    `}
  }
`;

const HeaderText = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--white);
  font-size: var(--medium-m);
`;

const SuccessContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 30rem;
`;

const SuccessText = styled.h3`
  text-align: center;
  color: var(--white);
  font-size: var(--medium-s);
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
`;
// Export register component
function Register({ t, pageChanger }) {
  // Initialize hooks
  const dispatch = useDispatch();

  // get success from register slice
  const registerSlice = useSelector((state) => state.register);
  const { error, isLoading, success } = registerSlice;

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(e) => onSubmit(e, dispatch)}
      >
        {(formik) => {
          return (
            <Form className="w3-animate-left">
              {success ? (
                <SuccessContainer>
                  <SuccessText>{t("register.verify your E-mail")}</SuccessText>
                </SuccessContainer>
              ) : (
                <HeaderText>{t("global.register")}</HeaderText>
              )}

              {isLoading && <LoaderMini flex={"1"} />}
              {!isLoading && !success && (
                <Body
                  t={t}
                  isLoading={isLoading}
                  error={error}
                  pageChanger={pageChanger}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
export default Register;
