// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../../../toolkit/shipping/shippingSlice";

// Import components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Loader from "../../../../components/loader/Loader";
import { Formik, Form } from "formik";
import Payments from "./components/Payments";

// Import actions and values
import { createOrder } from "../../../../toolkit/orders/actions";
import { reset } from "../../../../toolkit/orders/orderSlice";
import { initialValues, validationSchema } from "./values";

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
  margin-top: 1rem;
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

const Header = styled.div`
  text-align: center;
`;

const HeaderText = styled.h1`
  color: var(--black);
  font-size: var(--medium-s);
`;

// Export payment method component
function PaymentMethod() {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(["auth"]);

  const { shipping } = useSelector((state) => state.shipping);

  // Get order from orderSlice
  const OrderSlice = useSelector((state) => state.orders);
  const { error, isLoading, success, order } = OrderSlice;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.Cart._id}`, { replace: true });
    }
    return () => {
      dispatch(reset());
    };
  }, [success, dispatch, order?.Cart._id, navigate]);

  function onSubmit(values) {
    let data = { ...values };
    // Transform data
    data.first_name = shipping?.first_name || shipping?.company_name;
    data.last_name = shipping?.last_name || shipping?.company_type;
    data.personId = shipping?.id || shipping?.company_id;

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    dispatch(savePaymentMethod(data));
    dispatch(createOrder({ formData: data }));
  }

  return (
    <Container className="w3-animate-right">
      <CheckoutSteps step1 step2 step3 />
      <InnerContainer>
        <Header>
          <HeaderText>{t("shipping details.payment methods")}</HeaderText>
        </Header>
        {error && (
          <p>
            {error?.data["detail"]
              ? error?.data["detail"]
              : "something want wrong :)"}
          </p>
        )}
        {isLoading ? (
          <Loader color="blueviolet" />
        ) : (
          <Formik
            initialValues={initialValues(shipping)}
            validationSchema={() => validationSchema(t)}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Payments formik={formik} />
                  <Button type="submit">{t("global.pay")}</Button>
                </Form>
              );
            }}
          </Formik>
        )}
      </InnerContainer>
    </Container>
  );
}

export default PaymentMethod;
