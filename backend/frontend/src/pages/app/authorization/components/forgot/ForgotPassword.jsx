// Import styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../../../static/icons/components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// Import components
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import { Formik, Form } from "formik";
import { LoaderMini } from "../../../../../components";
// Import values and actions
import {
  forgotPassword,
  reset,
} from "../../../../../toolkit/auth/forgotPasswordSlice";
import { initialValues, validationSchema } from "./values";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    position: static;
    display: flex;
    flex-direction: column;
    min-width: 30rem;

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

  text-align: center;
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

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  color: var(--white);
  font-size: var(--small-l);

  &::first-letter {
    text-transform: capitalize;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

// Export forgot password components
function ForgotPassword({ t, pageChanger }) {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(forgotPassword(values));
  };

  const forgotPasswordSlice = useSelector((state) => state.forgotPassword);
  const { isLoading, error, success } = forgotPasswordSlice;

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
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="w3-animate-left">
              {success ? (
                <SuccessContainer>
                  <SuccessText>{t("register.link is sent")}</SuccessText>
                </SuccessContainer>
              ) : (
                <HeaderText>{t("resetPassword.reset password")}</HeaderText>
              )}

              {isLoading && <LoaderMini flex={"1"} />}
              {!isLoading && !success && (
                <>
                  {/* Display forgot password error */}
                  {error && (
                    <ErrorContainer>
                      <IconContainer>
                        <ErrorSVG />
                      </IconContainer>
                      <ErrorText>{error}</ErrorText>
                    </ErrorContainer>
                  )}
                  <Inputs t={t} />
                  <Buttons t={t} pageChanger={pageChanger} />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default ForgotPassword;
