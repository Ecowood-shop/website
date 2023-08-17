// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import actions and values
import { saveShippingMethod } from "../../../../toolkit/shipping/shippingSlice";
import { getShippingPrices } from "../../../../toolkit/shipping/actions";
import { initialValues, validationSchema } from "./values";

// Import components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import { Formik, Form } from "formik";
import Office from "./components/Office";
import Details from "./components/Details";
import Delivery from "./components/Delivery";
import RadioContainer from "./components/RadioContainer";

const Container = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${respondTo.lowTablet`
    width:90%;
  `}

  ${respondTo.tablet`
    width:80%;
  `}

  ${respondTo.laptop`
    width:80%;
  `}
  ${respondTo.desktop`
    width:1400px;
  `}

  ${respondTo.tv`
    width:1400px;
  `}
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 1rem;
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
  }

  ${respondTo.tablet`
    width:100%;    
    padding: 3rem 5rem;

    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}

  ${respondTo.laptop`
    width:100%;    
    padding: 3rem 5rem;

    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}

  ${respondTo.desktop`
    width:60%;    
    padding: 3rem 5rem;

    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}

  ${respondTo.tv`
    width:60%;    
    padding: 3rem 5rem;

    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}
`;

const Button = styled.button`
  cursor: pointer;
  margin-left: auto;
  padding: 0.5rem 3rem;

  color: var(--white);
  font-size: var(--small-l);

  border: none;
  border-radius: 20px;
  background-color: var(--color-primary);
  transition: color 0.1s ease-in-out;

  ${respondTo.mobile`
    margin-left:0;
    width:100%;
  `}

  ${respondTo.lowTablet`
    margin-left:0;
    width:100%;
  `}

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

// Export shipping method component
function ShippingMethod() {
  // Initializze hooks

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["auth"]);

  // Get shipping and shipping prices from redux store
  const { shipping } = useSelector((state) => state.shipping);
  const { shippingPrices } = useSelector((state) => state.shippingPrices);

  function onSubmit(values) {
    let data = { ...values };
    String(values.wants_delivery) === "True"
      ? (data._id = "")
      : (data.cityId = "");

    dispatch(saveShippingMethod(data));
    navigate("/checkout/shippingdetails", { replace: true });
  }

  useEffect(() => {
    dispatch(getShippingPrices({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  return (
    <Container>
      <CheckoutSteps step1 />
      <InnerContainer className="w3-animate-right">
        <Details t={t} />

        <Formik
          initialValues={initialValues(shipping)}
          validationSchema={() => validationSchema(t)}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <RadioContainer t={t} formik={formik} />

                {formik.values.wants_delivery === "False" && (
                  <Office t={t} formik={formik} />
                )}

                {formik.values.wants_delivery === "True" && (
                  <Delivery prices={shippingPrices} t={t} formik={formik} />
                )}
                <Button type="submit">
                  {t("shipping details.shipping details")}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </InnerContainer>
    </Container>
  );
}

export default ShippingMethod;
