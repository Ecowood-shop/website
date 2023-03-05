// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingDetails,
  getShippingPrices,
} from "../../../../store/actions/shippingActions";
import ORDER from "../../../../store/constants/orderConstants";

// components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Details from "./Details";
import { Formik, Form } from "formik";
import Delivery from "./Delivery";
import Office from "./Office";
import RadioContainer from "./RadioContainer";

// values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from "./styles.module.scss";

function ShippingMethod() {
  const shipping = useSelector((state) => state.shipping);
  const { shipping: shippingFromStorage, prices } = shipping;

  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(values) {
    let data = { ...values };
    String(values.wants_delivery) === "True"
      ? (data._id = "")
      : (data.cityId = "");

    dispatch(saveShippingDetails(data));
    navigate("/checkout/shippingdetails", { replace: true });
  }

  useEffect(() => {
    dispatch({ type: ORDER.CLEAR_ORDER });
    dispatch(getShippingPrices());
  }, []);


  return (
    <article className={styles.container}>
      <CheckoutSteps step1 />
      <section>
        <Details styles={styles} />

        <Formik
          initialValues={initialValues(shippingFromStorage)}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <RadioContainer styles={styles} />

                {formik.values.wants_delivery === "False" && (
                  <Office styles={styles} />
                )}

                {formik.values.wants_delivery === "True" && (
                  <Delivery styles={styles} prices={prices} />
                )}

                <button type="submit" className={styles.btn}>
                  მიწოდების დეტალები
                </button>
              </Form>
            );
          }}
        </Formik>
      </section>
    </article>
  );
}

export default ShippingMethod;
