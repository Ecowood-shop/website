// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import Hooks
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// Import components
import Button from "./components/Button";
import Inputs from "./components/Inputs";
import { LoaderMini, ErrorMessage } from "../../../../components";

// Import action and values
import { initialValues, validationSchema, onSubmit } from "./values";
import { reset } from "../../../../toolkit/shipping/shippingPriceSlice";
import { getShippingPrice } from "../../../../toolkit/shipping/actions";

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

// Export update city page
function UpdateCityScreen() {
  // Initialize hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);

  // Get shipping prices from store
  const shippingPriceSlice = useSelector((state) => state.shippingPrices);
  const { error, isLoading, shippingPrice, success } = shippingPriceSlice;

  useEffect(() => {
    success
      ? navigate("/admin/cities/")
      : dispatch(getShippingPrice({ id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success, id]);

  return (
    <Container>
      <Header>{t("global.edit")}</Header>

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
        shippingPrice && (
          <Formik
            initialValues={initialValues(shippingPrice)}
            validationSchema={() => validationSchema(t)}
            onSubmit={(e) => onSubmit(e, dispatch, id)}
          >
            {(formik) => {
              return (
                <Form className="w3-animate-right">
                  <Inputs t={t} />
                  <Button t={t} />
                </Form>
              );
            }}
          </Formik>
        )
      )}
    </Container>
  );
}

export default UpdateCityScreen;
