// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// Import components
import { Formik, Form } from "formik";
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Customer from "./components/Customer";
import Person from "./components/Person";
import Company from "./components/Company";
import Data from "./components/Data";
// Import actions and values
import { initialValues, validationSchema } from "./values";
import { saveShippingDetails } from "../../../../toolkit/shipping/shippingSlice";

const Container = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    align-items: center;
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
  margin-top: 1rem;
  padding: 0.5rem 3rem;

  color: var(--white);
  font-size: var(--small-l);
  border: none;
  border-radius: 20px;
  background-color: var(--color-primary);
  transition: color 0.1s ease-in-out;

  ${respondTo.mobile`
    margin-left:0;
    width:90%;
  `}

  ${respondTo.lowTablet`
    margin-left:0;
    width:80%;
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

// Export shipping details
function ShippingDetails() {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(["auth"]);

  const { shipping } = useSelector((state) => state.shipping);

  function onSubmit(values) {
    let data = { ...values };
    if (data.physicPerson !== "True") {
      data.first_name = "";
      data.last_name = "";
      data.id = "";
    } else {
      data.company_name = "";
      data.company_type = "";
      data.company_id = "";
    }
    data.address = String(values.wants_delivery) === "True" ? data.address : "";
    dispatch(saveShippingDetails(data));
    navigate("/checkout/paymentmethod");
  }

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <InnerContainer className="w3-animate-right">
        <Header>
          <HeaderText>{t("shipping details.shipping details")}</HeaderText>
        </Header>
        <Formik
          initialValues={initialValues(shipping)}
          validationSchema={() => validationSchema(t)}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Customer t={t} formik={formik} />
                {formik.values.physicPerson !== "False" ? (
                  <Person t={t} />
                ) : (
                  <Company t={t} formik={formik} />
                )}

                <Data shippingFromStorage={shipping} />

                <Button type="submit">
                  {t("shipping details.payment methods")}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </InnerContainer>
    </Container>
  );
}

export default ShippingDetails;
