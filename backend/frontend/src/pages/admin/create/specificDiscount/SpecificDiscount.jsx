// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import Hooks
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// Import components
import Button from "./components/Button";
import Inputs from "./components/Inputs";
import { LoaderMini, ErrorMessage } from "../../../../components";

// Import action and values
import { initialValues, validationSchema, onSubmit } from "./values";
import { reset } from "../../../../toolkit/discounts/discountSlice";

const Container = styled.div`
  margin: 10rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  min-width: 30rem;
  align-items: center;
  border-radius: 20px;

  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

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

const LoaderContainer = styled.div`
  margin: 3rem 0;
`;

const ErrorContainer = styled.div`
  width: 30rem;
  max-width: 80vw;
  margin-bottom: 1rem;

  * {
    margin: 0;
    stroke: var(--red);
    color: var(--red);
    background: transparent;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

// Export create specific discount page
function SpecificDiscount() {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);

  // Get specific discount from store
  const discountSlice = useSelector((state) => state.discounts);
  const { error, isLoading, success } = discountSlice;

  useEffect(() => {
    if (success) navigate("/admin/discounts/");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success]);
  return (
    <Container>
      <Header>{t("global.create discount")}</Header>

      {!isLoading && error && (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}

      {isLoading ? (
        <LoaderContainer>
          <LoaderMini color="darkmagenta" />
        </LoaderContainer>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={() => validationSchema(t)}
          onSubmit={(e) => onSubmit(e, dispatch)}
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
      )}
    </Container>
  );
}

export default SpecificDiscount;
